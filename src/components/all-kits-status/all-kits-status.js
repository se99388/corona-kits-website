import React, { useEffect, useState } from 'react';
import { getPriorityApiAllKitsInStock, getPriorityApiAllKitsInStockNotes } from '../../services/api';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import useHtmlTitle from '../../hooks/use-html-title';
import Spinner from '../../utils/spinner/Spinner.js';
import {refreshData} from '../../utils/io';
import MyTable from '../ui/table';
import { reduce } from '../../utils/reduce';
import { data, tableOrderData } from '../../corona-settings/data.js';
import textVersion from "textversionjs";


const convertArrToString = (arr) =>
    arr.reduce((accum, curr) => {
        accum += curr.TEXT
        return accum
    }, '');

const htmlToText = (html) => textVersion(html)

//this componet create the page 'Corona-stock-status'
const AllKitsStatus = () => {
    useHtmlTitle('Corona-kits-supply-status');
    const [allKitsStatus, setAllKitsStatus] = useState([]);
    const [error, setError] = useState(null);

    let textForProduct = [];

    useEffect(() => {
        getAllKitsStatus();
        const refreshSessionId= refreshData(getAllKitsStatus,600000);  
        return ()=>{clearInterval(refreshSessionId)}
   }, []);

    const getAllKitsStatus = async () => {
        try {
            textForProduct = []
            //query to api to get the stock and the supplier open order 
            const response = await getPriorityApiAllKitsInStock();
            //query to api to get the notes of each supplier open order 
            const response1 = await getPriorityApiAllKitsInStockNotes();
            // console.log(response1,response)
            if (response1.length && response.length) {
                // console.log(response1,response)
                //response from query of notes
                response1.map(order => {
                    return order.PORDERITEMS_SUBFORM.filter((product) => {
                        //checking if there is sny note in each supplier order for each product
                        if (product.PORDERITEMSTEXT_SUBFORM.length > 0) {
                            //convert the html data that comes from the priority to string
                            const htmlFormatText = convertArrToString(product.PORDERITEMSTEXT_SUBFORM)
                            product.PORDERITEMSTEXT_SUBFORM = htmlToText(htmlFormatText);
                            // use an array and create new key which contains the note (string not html)
                            textForProduct.push({ [product.PARTNAME]: product.PORDERITEMSTEXT_SUBFORM })
                            return product;
                        }
                    })
                })
                //if there are several notes for the same partname, this reduce gather all these notes to 1 string for each partname. this is how it looks like in the table
                const finalText = textForProduct.reduce((accum, curr) => {
                    const [key, value] = Object.entries(curr)[0];
                    if (accum[key]) {
                        accum[key] += value
                    }
                    else {
                        accum[key] = value;
                    }

                    return accum;
                }, {})

                //arrange the stock(BALANCE) and open orders (PORDERS) that got fron the sub_form from priority, in new keys
                const newData = response.map(item => {
                    item['BALANCE'] = item['LOGCOUNTERS_SUBFORM'][0].BALANCE;
                    item['PORDERS'] = item['LOGCOUNTERS_SUBFORM'][0].PORDERS;
                    delete item['LOGCOUNTERS_SUBFORM@odata.context'];
                    delete item['LOGCOUNTERS_SUBFORM'];
                    return item;
                })
                //for each partname that i got from response i add the samplesInStock value and the text (the notes I got from the second query=response1)
                const dataObj = reduce(newData, 'PARTNAME');
                for (const prop in data) {
                    Object.assign(dataObj[prop], { ...data[prop] });
                    dataObj[prop].samplesInStock = dataObj[prop].BALANCE * dataObj[prop].samples_per_box
                }
                for (const [key, value] of Object.entries(finalText)) {
                    dataObj[key].text = value
                }

                // console.log(dataObj);
                // console.log(newData);
                setAllKitsStatus(newData);

            }


        }
        catch (e) {
            setError(e.message)
        }
    };



    return (
        <Container>
          <br/>
                    {!allKitsStatus.length ? <Spinner /> : <MyTable 
                    tableContent={allKitsStatus} 
                    tableOrderData={tableOrderData} 
                    />}
                    {error && <Alert variant="danger">{error}</Alert>}
          
        </Container>
    )
}

export default AllKitsStatus;