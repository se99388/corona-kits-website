import React from 'react';

const KitsStock = ({ kit, numberUnitsInKit }) => {

    return (
        <h6>
            
            In stock:
        <p style={{ backgroundColor: '#B5EAD7', fontWeight:'bold', textAlign:'center'}} >{kit.LOGCOUNTERS_SUBFORM[0].BALANCE} kits ({kit.LOGCOUNTERS_SUBFORM[0].BALANCE * numberUnitsInKit} tests)</p>
        </h6>
    )
};

export default KitsStock;