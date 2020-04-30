import React, { useEffect, useState } from 'react';
import { getPriorityApiKitInStock } from '../../services/api';
import KitsSum from '../corona-kits-users/kits-supply/kits-sum';
import KitsStock from './kits-stock';
import { Card, Board } from './sub-header.styled'
const SubHeader = ({ partname, products, kitsSupply }) => {

    const [allKits, setAllKits] = useState([]);
    const [error, setError] = useState(null);

    const getKitDetail = async () => {
        try {
            const response = await getPriorityApiKitInStock(partname);
            addDescValue(response, products);
            console.log("response",response)
            setAllKits(response);
        }
        catch (e) {
            setError(e.message)
        }
    };

    const addDescValue = (arr, obj) => {
        arr.map((item, index) => {
            const objDesc = obj[item.PARTNAME].desc;
            item.desc = objDesc;
            return item
        })
    }

    useEffect(() => {
        if (partname) {
            getKitDetail();
        }

    }, []);
    const kitsQuantByPartname = () => {
        console.log(kitsSupply)
        const result = kitsSupply.reduce((accum, curr) => {
            if (!accum[curr.PARTNAME]) {
                accum[curr.PARTNAME] = { sum: 0 };
                // accum[curr.PARTNAME].sum = 0;
            }
            accum[curr.PARTNAME].sum += curr.TQUANT
            return accum;
        }, {})
        console.log("reduce", result)
        return result
    }

    const kitsQuantObj = kitsQuantByPartname()
    return (
        <>
        <Board>
                {allKits.length ? allKits.map((kit, key) =>
                    <Card key={key}>
                     <h6 style={{fontWeight: 'bold', textAlign:'center' }}>{kit.desc} kit ({kit.PARTNAME})</h6>
                        <KitsStock
                            kit={kit}
                            numberUnitsInKit={products[kit.PARTNAME].number_units_in_box}
                        />
                        <KitsSum
                            partname={kit.PARTNAME}
                            numberUnitsInKit={products[kit.PARTNAME].number_units_in_box}
                            quantity={kitsQuantObj[kit.PARTNAME] && kitsQuantObj[kit.PARTNAME].sum}
                        />
                    </Card>
                    ) : null}
                   </Board>

                {/* {Object.keys(kitsQuantObj) ? Object.keys(kitsQuantObj).map((partname, index) => <KitsSum
                    key={index}
                    partname={partname}
                    numberUnitsInKit={products[partname].number_units_in_box}
                    quantity={kitsQuantObj[partname].sum}
                />
               
                ) : null} */}
                {error && <h3>{error}</h3>}
           
                </>
    )
}

export default SubHeader;