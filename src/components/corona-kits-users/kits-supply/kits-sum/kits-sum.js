import React from 'react';

const KitsSum = ({numberUnitsInKit, quantity=0}) =>{

    return(
        <h6>Supplied kits: 
        <p style = {{backgroundColor:'#bae1ff', textAlign:'center'}}>{quantity} ({quantity*numberUnitsInKit} tests)</p></h6>

)}

export default KitsSum;