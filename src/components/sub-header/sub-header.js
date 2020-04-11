import React, {useEffect, useState} from 'react';
import {getPriorityApiKitInStock} from '../../services/api';
const SubHeader = ({partname}) =>{

    console.log(partname)
    const [allKits, setAllKits] = useState([]);
    const [error, setError] = useState(null);

    const getKitDetail = async() =>{
        try{
            const response = await getPriorityApiKitInStock(partname);
            console.log(response,"response")
            setAllKits(response);
        }
        catch(e){
            setError(e.message)
        }
    };

    useEffect(()=>{
        if(partname){
            getKitDetail()
        }
       
    },[partname]);

    return(<>

        {allKits.length && allKits.map((kit, key)=>
        <div key={key} style = {{textAlign:'center', margin: 'auto'}}>
        <h4 >Available Corona kit {kit.PARTNAME} in stock:</h4>
        <h3 style = {{backgroundColor:'#B5EAD7', fontWeight:'bold'}} >{kit.LOGCOUNTERS_SUBFORM[0].BALANCE} kits ({kit.LOGCOUNTERS_SUBFORM[0].BALANCE * 100} tests)</h3>
        </div>
        )}

        {error && <h3>{error}</h3>}
        </>  
    )
}

export default SubHeader;