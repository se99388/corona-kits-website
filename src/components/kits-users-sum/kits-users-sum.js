import React,{useEffect, useState} from 'react';
import {getPriorityApiLabsList} from '../../services/api';
import { renameValueInArr, sortByKey, updateData, refreshData, listOfCustomers } from '../../utils/io';
import UsersSumTable from './users-sum-table';
import Spinner from '../../utils/spinner/Spinner.js';
import { Alert } from 'react-bootstrap';

const CORONA_ITEMS = ['IMRP10243X','IMHW4412'];

const tableOrderData = [
    { field: 'lab', title: 'lab' },
    { field: 'IMRP10243X', title: 'RT-PCR Seegene kit' },
    { field: 'IMHW4412', title: 'RT-PCR BGI kit' },
    { field: 'total', title: 'TOTAL' },
]
const KitsUsersSum=()=>{
    const [usersList, setUsersList] = useState([]);
    const [kitsSupplySum, setKitsSupplySum] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const priorityApiLabsList =async()=>{
        try{
            setIsLoading(true);
            let result = await getPriorityApiLabsList(CORONA_ITEMS);
            result = updateData(result);
            setUsersList(listOfCustomers(result))
            console.log(result)
            const SumOfEachKitByUser=SumEachKitByUsers(listOfCustomers(result));
            setKitsSupplySum(SumOfEachKitByUser);
            setIsLoading(false);
        }catch (e) {
            setError(e.message);
        }
      
    }

    const handleSort = (isAsc, keyToSort) => {
        const sortedTable = sortByKey(kitsSupplySum, keyToSort, isAsc);
        setKitsSupplySum(sortedTable)
        // console.log(sortedTable)
    }

    const SumEachKitByUsers=(list)=>
    Object.keys(list).map(user=>{
             const userDetail = Object.assign({'lab':user, 'total':0},...CORONA_ITEMS.map(item=>({[item]:0})))
            const arr = list[user].map(supply=>({[supply.PARTNAME]:supply.TQUANT}))
            .reduce((accum,curr)=>{
                const [key, value] = Object.entries(curr)[0];
                if (!accum[key]){
                    accum[key] = value;
                }
                else{
                    accum[key] +=value;
                }
                accum['total'] +=value;
                return accum;
            },userDetail);
            return arr;
        });

    useEffect(()=>{
        priorityApiLabsList()
    },[]);
    return(
        <>
      {  isLoading ? <Spinner /> :<UsersSumTable
        tableContent={Object.values(kitsSupplySum)}
        tableOrderData={tableOrderData}
        sort={handleSort}
        />}
         {error && <Alert variant="danger">{error}</Alert>}
        </>
    )
}

export default KitsUsersSum;