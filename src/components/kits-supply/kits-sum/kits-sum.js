import React from 'react';

const KitsSum = ({totalNumKits,products,partnames}) =>{
console.log(totalNumKits,products,partnames)
    return(
        Object.keys(totalNumKits)?Object.keys(totalNumKits).map((partname,index)=>
        <h6 key={index}>SUPPLIED KITS ({partname}): 
        <span style = {{backgroundColor:'#bae1ff', fontWeight:'bold'}}>{totalNumKits[partname].sum} ({totalNumKits[partname].sum*products[partname].number_units_in_box} tests)</span></h6>
    ):null
        
    )
}

export default KitsSum