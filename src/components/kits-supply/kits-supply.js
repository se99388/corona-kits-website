import React, { useEffect, useState } from 'react';
import { getKitsSupply } from '../../services/api';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { KitsSupplyTable } from './kits-supply.styled';
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
    return (<Container >
   <Row>
   <Col>
        < KitsSupplyTable size="sm" striped bordered hover responsive="xs">
        <thead>
            {title}
        </thead>
        <tbody>
            {tableContent}
        </tbody>
    </KitsSupplyTable >
    </Col>
    </Row>
    </Container >
    )
}

export default KitsSupply;