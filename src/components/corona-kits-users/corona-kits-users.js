import React,{useState} from 'react';
import KitsSupply from '../kits-supply';
const CoronaKitsUsers = ()=>{
    const [catalogNum,setCatalogNum] = useState('IMRP10243X')
    return (
        <>
        <button onClick={()=>setCatalogNum(`IM7443004U`)}>IM7443004U</button>
        <button onClick={()=>setCatalogNum(`IMHW4412`)}>IMHW4412</button>
        <button onClick={()=>setCatalogNum(`IMR2141`)}>IMR2141</button>
        <button onClick={()=>setCatalogNum(`IMRP10243X`)}>IMRP10243X</button>
        <KitsSupply partname={catalogNum} />
        </>
    )
}

export default CoronaKitsUsers;