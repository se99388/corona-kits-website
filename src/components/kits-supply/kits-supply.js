import React, { useEffect, useState } from 'react';
import { getPriorityApiLabsList, getPriorityApiLabsListByDate } from '../../services/api';
import { Button, Table, Container, Row, Col, Alert} from 'react-bootstrap';
import SubHeader from '../sub-header';
import SearchByCustomer from './search-by-customer';
import KitsSum from './kits-sum';
import Spinner from '../../utils/spinner/Spinner.js';
import { renameValueInArr, sortByKey, updateData, refreshData, listOfCustomers } from '../../utils/io';
import SearchByDate from './search-by-date';
import KitsSupplyTable from './kits-supply-table';
import {data} from '../all-kits-status/data';

const TABLE_TITLES = [{ PARTNAME: "CATALOG NUM" },{STATDES:"STATDES"},{ DOCDES: "SUPPLY STATUS " }, { CDES: "LAB" }, { TQUANT: "QUANTITY" }, { CURDATE: "SUPPLY DATE" },{CUSTNAME:"CUSTNAME"}];

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


    const handleSort = (isAsc, keyToSort) => {
        const sortedTable = sortByKey(kitsSupply, keyToSort, isAsc);
        setKitsSupply(sortedTable)
        // console.log(sortedTable)
    }
  
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
                    <Row className="justify-content-center mt-2">
                        <SubHeader 
                        partname={partname}
                        descriptionItem={description} 
                        products={products}
                        kitsSupply={kitsSupply}
                        />
                    </Row>
                    <Row className="mt-2">
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