import React, { useEffect, useState } from 'react';
import { getPriorityApiLabsList, getPriorityApiLabsListByDate } from '../../services/api';
import { renameValueInArr, sortByKey, updateData, refreshData, listOfCustomers } from '../../utils/io';
import UsersSumTable from './users-sum-table';
import Spinner from '../../utils/spinner/Spinner.js';
import { Alert, Row, Col,Button } from 'react-bootstrap';
import SearchByDate from '../corona-kits-users/kits-supply/search-by-date';

const CORONA_ITEMS = ['IMRP10243X', 'IMHW4412'];

const tableOrderData = [
    { field: 'lab', title: 'lab' },
    { field: 'IMRP10243X', title: 'RT-PCR Seegene kit' },
    { field: 'IMHW4412', title: 'RT-PCR BGI kit' },
    { field: 'total', title: 'TOTAL' },
]
//this component creat the Summery page
const KitsUsersSum = () => {
    const [usersList, setUsersList] = useState([]);
    const [kitsSupplySum, setKitsSupplySum] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        priorityApiLabsList();
    }, []);

    ////the main query to api (same as the main query of corona kits users page)
    const priorityApiLabsList = async () => {
        try {
            setIsLoading(true);
            let result = await getPriorityApiLabsList(CORONA_ITEMS);
            summarizeData(result)
            setIsLoading(false);
        } catch (e) {
            setError(e.message);
        }

    }

    const handleSort = (isAsc, keyToSort) => {
        const sortedTable = sortByKey(kitsSupplySum, keyToSort, isAsc);
        setKitsSupplySum(sortedTable)
        // console.log(sortedTable)
    }

    //this function sum the quantity of the kits for each user/lab
    const summarizeData=(result)=>{
        //change the qaunt to + or - 
        result = updateData(result)
        //create object. key=customer name, value=array of list supplies object 
        setUsersList(listOfCustomers(result))
        //summarize the quantity of each kit for each customer 
        const SumOfEachKitByUser = SumEachKitByUsers(listOfCustomers(result));
        setKitsSupplySum(SumOfEachKitByUser);
    }

    const SumEachKitByUsers = (list) =>
        Object.keys(list).map(user => {
            const userDetail = Object.assign({ 'lab': user, 'total': 0 }, ...CORONA_ITEMS.map(item => ({ [item]: 0 })))
            const arr = list[user].map(supply => ({ [supply.PARTNAME]: supply.TQUANT }))
                .reduce((accum, curr) => {
                    const [key, value] = Object.entries(curr)[0];
                    if (!accum[key]) {
                        accum[key] = value;
                    }
                    else {
                        accum[key] += value;
                    }
                    accum['total'] += value;
                    return accum;
                }, userDetail);
            return arr;
        });

  //the query by date filter to api (same as the query in the corona-kits-users page) 
    const priorityApiLabsListByDate = async (dates) => {
        try {
            let result = await getPriorityApiLabsListByDate(dates, CORONA_ITEMS);
            if (result.error) {
                setError(result.error)
            }
            else {
                summarizeData(result);
            }

        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div>
            {isLoading ? <Spinner /> :
                <div className='mt-3'>
                 <Row>
                        <Col>
                            <SearchByDate apiByDate={priorityApiLabsListByDate} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant='info' onClick={priorityApiLabsList}>Refresh </Button>
                        </Col>
                    </Row>
                    <UsersSumTable
                        tableContent={Object.values(kitsSupplySum)}
                        tableOrderData={tableOrderData}
                        sort={handleSort}
                    />
                </div>
            }
            {error && <Alert variant="danger">{error}</Alert>}
        </div>
    )
}

export default KitsUsersSum;