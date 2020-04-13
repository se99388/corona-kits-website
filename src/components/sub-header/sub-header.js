import React, {useEffect, useState} from 'react';
import {getPriorityApiKitInStock} from '../../services/api';
const SubHeader = ({partname, descriptionItem,products}) =>{

    const [allKits, setAllKits] = useState([]);
    const [error, setError] = useState(null);

    const getKitDetail = async() =>{
        try{
            const response = await getPriorityApiKitInStock(partname);
            console.log(response)
            const newArr = addValue(response,products);
            console.log(newArr)
            setAllKits(response);
        }
        catch(e){
            setError(e.message)
        }
    };

    const addValue = (arr,obj)=>{
        return arr.map((item,index)=>{
            const objDesc = obj[item.PARTNAME].desc;
            item.desc=objDesc;
            return item
        })
    }

    useEffect(()=>{
        if (partname){
            getKitDetail();
        }
            
    },[]);

    return(<>

        {allKits.length ? allKits.map((kit, key)=>
        <div key={key} style = {{textAlign:'center', margin: 'auto'}}>
        <h5 >Available {kit.desc} kit ({kit.PARTNAME}) in stock:</h5>
        <h4 style = {{backgroundColor:'#B5EAD7', fontWeight:'bold'}} >{kit.LOGCOUNTERS_SUBFORM[0].BALANCE} kits ({kit.LOGCOUNTERS_SUBFORM[0].BALANCE * products[kit.PARTNAME].number_units_in_box} tests)</h4>
        </div>
        ):null}

        {error && <h3>{error}</h3>}
        </>  
    )
}

export default SubHeader;