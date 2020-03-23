import React, { useEffect, useState } from 'react';
import { logout, getPriorityApiLabsList } from '../../services/api';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import { KitsSupplyTable } from './kits-supply.styled';
import { useHistory } from 'react-router-dom';
import SubHeader from '../sub-header';
import useHtmlTitle from '../../hooks/use-html-title';
import Moment from 'react-moment';
import SearchByCustomer from './search-by-customer';
import KitsSum from './kits-sum';
import Spinner from '../../utils/spinner/Spinner.js';
const TABLE_TITLES = ["SUPPLY STATUS ", "LAB", " QUANTITY", "SUPPLY DATE"]
const KitsSupply = () => {
    useHtmlTitle('Corona-kits-supply');
    const history = useHistory();
    const [kitsSupply, setKitsSupply] = useState([]);
    const [customersList, setCustomersList] = useState([]);
    const [totalNumKits, setTotalNumKits] = useState(null);
    const [error, setError] = useState(null);

    const priorityApiLabsList = async () => {
        try {
            setKitsSupply([])
            let result = await getPriorityApiLabsList();
            result = result.map(item => {
                item.CURDATE = <Moment format="DD/MM/YYYY">{item.CURDATE}</Moment>
                if (item.DOCDES == 'החזרה מלקוח') {
                    item.TQUANT = item.TQUANT * -1;
                }
                return item;
            });

            setCustomersList(listOfCustomers(result))
            setKitsSupply(result);
        } catch (e) {
            setError(e.message);
        }
    }
    useEffect(() => {
        priorityApiLabsList()
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


    const listOfCustomers = (list) => {
        console.log("list", list)
        // let mySet = new Set([...kitsDetails]);
        // const newArr = kitsDetails.map(obj=>{

        // })
        if (list) {
            const newArr = list.reduce((accum, curr) => {
                // let newObj = [];
                // let newSet = accum[curr['CUSTNAME']] = curr
                // // newObj.push(curr['CUSTNAME']);
                // // newObj.push(curr)
                // // newObj[curr['CUSTNAME']]=curr['CUSTNAME'];
                (accum[curr['CUSTNAME']] = accum[curr['CUSTNAME']] || []).push(curr)
                // accum.push(newSet)
                return accum;
            }, [])
            const arr2 = [1, 2, 3, 3, 3, 4, 5, 6]
            const mySet = new Set(newArr)
            const back = [...mySet]
            // console.log("listOfCustomers", newArr)
            return newArr;
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
    const kitsQuant = () => {
        const result = kitsSupply.reduce((accum, curr) => {
            return accum + curr.TQUANT;
        }, 0)
        return result
    }
    return (
        <Container >
            {!kitsSupply.length?<Spinner />:
            <>
            <Button className="mb-3" onClick={logoutHandle}>Log out </Button>
            <Row>
                <SearchByCustomer
                    customersList={customersList}
                    listSupply={setKitsSupply}
                />
            </Row>
            <Row>
                <Col>
                    <Button onClick={priorityApiLabsList}>Get All Customers </Button>
                </Col>
            </Row>
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
            <KitsSum totalNumKits={kitsQuant()} /></>}

            {error && <Alert variant="danger">{error}</Alert>}
        </Container >
    )
}

export default KitsSupply;