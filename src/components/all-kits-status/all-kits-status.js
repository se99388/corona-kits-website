import React, { useEffect, useState } from 'react';
import { getPriorityApiAllKitsInStock, getPriorityApiAllKitsInStockNotes } from '../../services/api';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useHtmlTitle from '../../hooks/use-html-title';
import Moment from 'react-moment';
import Spinner from '../../utils/spinner/Spinner.js';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import MyTable from '../ui/table';
import { reduce } from '../../utils/reduce';
import { data } from './data';
import textVersion from "textversionjs";

const TABLE_TITLE = ['catalog number', 'description', 'quantity in stock (boxes)', 'open orders (boxes)', 'units per box', 'unit for 1 sample', 'samples per box', 'notes', 'No. of samples in stock'];


const convertArrToString = (arr) =>
    arr.reduce((accum, curr) => {
        accum += curr.TEXT
        return accum
    }, '');

const htmlToText = (html) => textVersion(html)


const AllKitsStatus = () => {
    useHtmlTitle('Corona-kits-supply-status');
    const [allKitsStatus, setAllKitsStatus] = useState([]);
    const [error, setError] = useState(null);

    const textForProduct = []

    const getAllKitsStatus = async () => {
        try {
            const response = await getPriorityApiAllKitsInStock();
            const response1 = await getPriorityApiAllKitsInStockNotes();
            if (response1.length && response.length) {
                response1.map(order => {
                    return order.PORDERITEMS_SUBFORM.filter((product) => {
                        if (product.PORDERITEMSTEXT_SUBFORM.length > 0) {
                            const htmlFormatText = convertArrToString(product.PORDERITEMSTEXT_SUBFORM)
                            product.PORDERITEMSTEXT_SUBFORM = htmlToText(htmlFormatText);
                            textForProduct.push({ [product.PARTNAME]: product.PORDERITEMSTEXT_SUBFORM })
                            return product;
                        }
                    })
                })
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
    
    
                const newData = response.map(item => {
                    item['BALANCE'] = item['LOGCOUNTERS_SUBFORM'][0].BALANCE;
                    item['PORDERS'] = item['LOGCOUNTERS_SUBFORM'][0].PORDERS;
                    delete item['LOGCOUNTERS_SUBFORM@odata.context'];
                    delete item['LOGCOUNTERS_SUBFORM'];
                    return item;
                })
    
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

    useEffect(() => {
        getAllKitsStatus()
    }, []);

    return (
        <div>
            <Row >
                <Link as={Col} className='mb-3' to='/kits-supply'>Back</Link>
            </Row>
            {!allKitsStatus.length ? <Spinner /> : <MyTable tableTitles={TABLE_TITLE} tableContent={allKitsStatus} />}
            {error && <Alert variant="danger">{error}</Alert>}
        </div>
    )
}

export default AllKitsStatus;