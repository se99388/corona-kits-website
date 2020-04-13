import React, { useEffect, useState } from 'react';
import { getPriorityApiLabsList, getPriorityApiLabsListByDate } from '../../services/api';
import { Button, Table, Container, Row, Col, Alert} from 'react-bootstrap';
import SubHeader from '../sub-header';
import SearchByCustomer from './search-by-customer';
import KitsSum from './kits-sum';
import Spinner from '../../utils/spinner/Spinner.js';
import { renameValueInArr, sortByKey, updateData, refreshData } from '../../utils/io';
import SearchByDate from './search-by-date';
import KitsSupplyTable from './kits-supply-table';
import {data} from '../all-kits-status/data';

const TABLE_TITLES = [{ PARTNAME: "CATALOG NUM" },{STATDES:"STATDES"},{ DOCDES: "SUPPLY STATUS " }, { CDES: "LAB" }, { TQUANT: "QUANTITY" }, { CURDATE: "SUPPLY DATE" },{CUSTNAME:"CUSTNAME"}];
const CUSTOMERS_TO_JOIN = [`ביוטק מדיקל סאפליי - עייאד רבי`, `לאבטק סופליי קומפני`, `מדיפארם בע'מ`]

const KitsSupply = ({ partname, description,products }) => {

    const [kitsSupply, setKitsSupply] = useState([]);
    const [customersList, setCustomersList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const priorityApiLabsList = async () => {
        try {
            setIsLoading(true);
            let result = await getPriorityApiLabsList(partname);
            // console.log("result",result)
            result = updateData(result);
            setCustomersList(listOfCustomers(result))
            setKitsSupply(result);
            setIsLoading(false);
        } catch (e) {
            setError(e.message);
        }
    }

    useEffect(() => {
        priorityApiLabsList();
        const refreshSessionId = refreshData(priorityApiLabsList, 600000);
        return () => { clearInterval(refreshSessionId) }
    }, [partname]);

    const listOfCustomers = (list) => {
        const newObj = list.reduce((accum, curr) => {
            if (!accum[curr.CDES])
                accum[curr.CDES] = []
            accum[curr.CDES].push(curr)
            return accum;
        }, {})

        //add new customer name to the customer list object - it is mutating object
        joinCustomersUnderNewKey(newObj)
        // console.log(newObj)
        return newObj

    }

    const joinCustomersUnderNewKey = (currentObj, newKey = 'לקוחות פלשתינאים') => {
        CUSTOMERS_TO_JOIN.map(name => {
            if (currentObj[name]) {
                const oldKey = name;
                if (!currentObj[newKey]) {
                    currentObj[newKey] = []
                }
                currentObj[newKey].push(...currentObj[oldKey])
                delete currentObj[oldKey]
            }
        })
        //change customer name in each object int the array to the new key name = 'לקוחות פלשתינאים'
        currentObj[newKey] && renameValueInArr(currentObj[newKey], 'CDES', newKey)
    }

    const handleSort = (isAsc, keyToSort) => {
        const sortedTable = sortByKey(kitsSupply, keyToSort, isAsc);
        setKitsSupply(sortedTable)
        // console.log(sortedTable)
    }
  
    const kitsQuant = () => {
        // console.log(kitsSupply)
        const result = kitsSupply.reduce((accum, curr) => {
            return accum + curr.TQUANT;
        }, 0)
        return result
    }
    // PARTNAME: "IMRP10243X"
    // STATDES: "פורקה"
    // DOCDES: "אריזות ללקוח"
    // CDES: "ד"ר חיים בן צבי - בי"ח בלינסון"
    // TQUANT: 4
    // CURDATE: "2020-04-13"
    // CUSTNAME: "200737"
    // Y_8871_5_ESHB: null
    // Y_4795_5_ESHB: null
    const kitsQuantObj = () => {
        console.log(kitsSupply)
        const result = kitsSupply.reduce((accum, curr) => {
            if (!accum[curr.PARTNAME]){
                accum[curr.PARTNAME]={sum:0};
                // accum[curr.PARTNAME].sum = 0;
            }
            accum[curr.PARTNAME].sum +=curr.TQUANT
            return accum;
        }, {})
        console.log("reduce",result)
        return result
    }
    kitsQuantObj()
    const priorityApiLabsListByDate = async (dates) => {
        try {
            setKitsSupply([])

            let result = await getPriorityApiLabsListByDate(dates, partname);
            if (result.error) {
                setError(result.error)
            }
            else {
                result = updateData(result)
                setCustomersList(listOfCustomers(result))
                setKitsSupply(result);
            }

        } catch (e) {
            setError(e.message);
        }
    }
    // console.log("kitsSupply", kitsSupply)
    return (
        <Container className='mt-3'>
            {isLoading ? <Spinner /> :
                <>
                    <Row>
                        <Col>
                            <SearchByDate apiByDate={priorityApiLabsListByDate} />
                        </Col>
                        <SearchByCustomer
                            customersList={customersList}
                            listSupply={setKitsSupply}
                        />
                    </Row>
                    <Row>
                        <Col>
                            <Button variant='info' onClick={priorityApiLabsList}>Refresh </Button>
                        </Col>
                    </Row>
                    <Row>
                        <SubHeader 
                        partname={partname}
                        descriptionItem={description} 
                        products={products}
                        />
                    </Row>
                    <KitsSum 
                    totalNumKits={kitsQuantObj()} 
                    products={products}
                    partnames={partname}
                    />
                    <Row>
                        <Col  style={{padding:'5px'}}>
                        <KitsSupplyTable 
                        kitsSupply={kitsSupply}
                        tableTitles={TABLE_TITLES}
                        sort={handleSort}
                        />         
                        </Col>
                    </Row>
                    </>}

            {error && <Alert variant="danger">{error}</Alert>}
        </Container >
    )
}

export default KitsSupply;