import React, { useEffect, useState } from 'react';
import { getKitsSupply } from '../../services/api';
import { Button, Table } from 'react-bootstrap';
import { KitsSupplyTable } from './kits-supply.styled';
import Moment from 'react-moment';
const KitsSupply = () => {

    const [kitsSupply, setKitsSupply] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await getKitsSupply()
            console.log(result)
            setKitsSupply(result);
        })();
    }, []);

    const title = kitsSupply.length ? (
        <tr>
            <th>#</th>
            {Object.keys(kitsSupply[0]).map((item, index) =>
                <th key={index}>{item.toUpperCase()}</th>
            )}
        </tr>
    ) : null
    let rowNum = 1;

    const tableContent = (<>
        {kitsSupply.map((currentContent) =>
            <tr key={currentContent.id} id={currentContent.id}>
                <td>{rowNum++}</td>
                {Object.entries(currentContent).map((item, index) =>
                    <td key={index} name={item[0]}>
                        {item[1] || "Empty"}
                    </td>
                )}
            </tr>)
        }
    </>)
    return (<>
        < KitsSupplyTable striped bordered hover responsive="sm">
        <thead>
            {title}
        </thead>
        <tbody>
            {tableContent}
        </tbody>
    </KitsSupplyTable >
    </>
    )
}

export default KitsSupply;