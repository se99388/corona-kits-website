import React, { useEffect, useState } from 'react';
import { getKitsSupply, logout } from '../../services/api';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { KitsSupplyTable } from './kits-supply.styled';
import { useHistory } from 'react-router-dom';
import SubHeader from '../sub-header';
import useHtmlTitle from '../../hooks/use-html-title';

const TABLE_TITLES = ["ID", "KIT NAME", "CATALOG NUMBER", "LAB"," QUANTITY", "DATE SUPPLY"]
const KitsSupply = () => {
    useHtmlTitle('Corona-kits-supply');
    const history = useHistory();
    const [kitsSupply, setKitsSupply] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await getKitsSupply()
            console.log(result)
            setKitsSupply(result);
        })();
    }, []);

    const logoutHandle = async()=>{
        const response = await logout();
        console.log(response);
        if (response.success){
            history.push('/')
        }else{
            alert ('Error')
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
         <Button onClick={logoutHandle}>Log out </Button>
        <Row>
            <SubHeader />
        </Row>
        <Row>
            <Col>
                < KitsSupplyTable  striped bordered hover responsive="sm">
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