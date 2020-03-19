import React, { useEffect, useState } from 'react';
import { logout, getPriorityApiLabsList } from '../../services/api';
import { Button, Table, Container, Row, Col,Alert } from 'react-bootstrap';
import { KitsSupplyTable } from './kits-supply.styled';
import { useHistory } from 'react-router-dom';
import SubHeader from '../sub-header';
import useHtmlTitle from '../../hooks/use-html-title';
import Moment from 'react-moment';

const TABLE_TITLES = ["SUPPLY STATUS ", "LAB", " QUANTITY", "SUPPLY DATE "]
const KitsSupply = () => {
    useHtmlTitle('Corona-kits-supply');
    const history = useHistory();
    const [kitsSupply, setKitsSupply] = useState([]);
    const [totalNumKits, setTotalNumKits] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let allKitQuantity = 0;
                let result = await getPriorityApiLabsList();
                result = result.map(item => {
                    item.CURDATE = <Moment format="DD/MM/YYYY">{item.CURDATE}</Moment>
                    if (item.DOCDES == 'החזרה מלקוח'){
                        item.TQUANT = item.TQUANT * -1;
                    }
                    allKitQuantity += item.TQUANT;
                    return item;
                });
                setKitsSupply(result);
                setTotalNumKits(allKitQuantity);
            } catch (e) {
                setError(e.message);
            }
        })();
    }, []);

    const logoutHandle = async () => {
        const response = await logout();
        console.log(response);
        if (response.success) {
            history.push('/')
        } else {
            alert('Error')
        }
    }

    const title = kitsSupply.length ? (
        <tr>
            <th>#</th>
            {TABLE_TITLES.map((item, index) =>
                <th key={index}>{item.toUpperCase()}</th>
            )}
        </tr>
    ) : null
    let rowNum = 1;

    const tableContent = (<>
        {kitsSupply.map((currentContent, index) =>
            <tr key={index} id={currentContent.id}>
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
        <Button onClick={logoutHandle}>Log out </Button>
        <Row>
            <SubHeader />
        </Row>
        <Row>
            <Col>
                < KitsSupplyTable striped bordered hover responsive="xs">
                    <thead>
                        {title}
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </KitsSupplyTable >
            </Col>
        </Row>
        <h5>TOTAL NUMBERS OF KITS: {totalNumKits}</h5>
        {error&&<Alert variant="danger">{error}</Alert>}
    </Container >
    )
}

export default KitsSupply;