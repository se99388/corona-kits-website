import React from 'react';

const KitsSum = ({totalNumKits,products,partnames}) =>{
console.log(totalNumKits,products,partnames)
    return(
        Object.keys(totalNumKits)?Object.keys(totalNumKits).map((partname,index)=>
        <h5 key={index}>SUPPLIED KITS ({partname}): {totalNumKits[partname].sum} ({totalNumKits[partname].sum*products[partname].number_units_in_box} tests)</h5>
    ):null
        
    )
}

export default KitsSum