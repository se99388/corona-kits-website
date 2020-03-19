import React, {useEffect, useState} from 'react';
import {getPriorityApiKitInStock} from '../../services/api';
const SubHeader = ({update}) =>{
    const [allKits, setAllKits] = useState([]);
    const [error, setError] = useState(null);

    const getKitDetail = async() =>{
        try{
            const response = await getPriorityApiKitInStock();
            setAllKits(response);
        }
        catch(e){
            setError(e.message)
        }
    };

    useEffect(()=>{
        getKitDetail()
    },[update]);

    return(<>

        {allKits.map((kit, key)=>
        <div key={key} style = {{textAlign:'center', margin: 'auto'}}>
        <h4 >Available Corona seegene kits in stock:</h4>
        <h3 style = {{backgroundColor:'#B5EAD7', fontWeight:'bold'}} >{kit.LOGCOUNTERS_SUBFORM[0].BALANCE} kits ({kit.LOGCOUNTERS_SUBFORM[0].BALANCE * 100} tests)</h3>
        </div>
        )}

        {error && <h3>{error}</h3>}
        </>  
    )
}

export default SubHeader;