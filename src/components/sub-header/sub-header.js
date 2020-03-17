import React, {useEffect, useState} from 'react';
import {getKits} from '../../services/api';
import KitsSupply from '../kits-supply/kits-supply';
const SubHeader = () =>{
    const [allKits, setAllKits] = useState([]);
    const [error, setError] = useState(null);

    const getKitDetail = async() =>{
        try{
            const response = await getKits()
            setAllKits(response);
        }
        catch(e){
            setError(e.message)
        }
    };

    useEffect(()=>{
        getKitDetail()
    },[]);

    return(<>

        {allKits.map((kit, key)=>
        <h3 key={key}>The available quantity of {kit.name}: {kit.quantity} units</h3>)}

        {error && <h3>{error}</h3>}
        </>  
    )
}

export default SubHeader;