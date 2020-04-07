import React, { useEffect, useState } from 'react';
import { logout, getPriorityApiLabsList, getPriorityApiLabsListByDate } from '../../services/api';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import { KitsSupplyTable, TrWithColor, MyDiv, RowCenter } from './kits-supply.styled';
import { useHistory } from 'react-router-dom';
import SubHeader from '../sub-header';
import useHtmlTitle from '../../hooks/use-html-title';
import SearchByCustomer from './search-by-customer';
import KitsSum from './kits-sum';
import Spinner from '../../utils/spinner/Spinner.js';
import { renameValueInArr, sortByKey, updateData, refreshData } from '../../utils/io';
import Calendar from '../ui/calendar';
import Sort from '../ui/sort';
import Popup from "reactjs-popup";
import Nav from '../nav';
import { Link } from 'react-router-dom';

const TABLE_TITLES = [{ DOCDES: "SUPPLY STATUS " }, { CDES: "LAB" }, { TQUANT: "QUANTITY" }, { CURDATE: "SUPPLY DATE" }];
const CUSTOMERS_TO_JOIN = [`ביוטק מדיקל סאפליי - עייאד רבי`, `לאבטק סופליי קומפני`, `מדיפארם בע'מ`]

const KitsSupply = () => {
    useHtmlTitle('Corona-kits-supply');
    const history = useHistory();
    const [kitsSupply, setKitsSupply] = useState([]);
    const [customersList, setCustomersList] = useState([]);
    const [error, setError] = useState(null);
    //2020-04-05T00:00:00+02:00

    const priorityApiLabsList = async () => {
        try {
            let result = await getPriorityApiLabsList();

            result = updateData(result);
            setCustomersList(listOfCustomers(result))
            setKitsSupply(result);
        } catch (e) {
            setError(e.message);
        }
    }

    useEffect(() => {
        priorityApiLabsList();
        const refreshSessionId = refreshData(priorityApiLabsList,600000);
        return ()=>{clearInterval(refreshSessionId)}
    }, []);


    const logoutHandle = async () => {
        const response = await logout();
        if (response.success) {
            history.push('/')
        } else {
            alert('Error')
        }
    }


    const listOfCustomers = (list) => {
        const newObj = list.reduce((accum, curr) => {
            if (!accum[curr.CDES])
                accum[curr.CDES] = []
            accum[curr.CDES].push(curr)
            return accum;
        }, {})

        //add new customer name to the customer list object - it is mutating object
        joinCustomersUnderNewKey(newObj)
        // console.log(newObj)
        return newObj

    }

    const joinCustomersUnderNewKey = (currentObj, newKey = 'לקוחות פלשתינאים') => {
        CUSTOMERS_TO_JOIN.map(name => {
            if (currentObj[name]) {
                const oldKey = name;
                if (!currentObj[newKey]) {
                    currentObj[newKey] = []
                }
                currentObj[newKey].push(...currentObj[oldKey])
                delete currentObj[oldKey]
            }
        })
        //change customer name in each object int the array to the new key name = 'לקוחות פלשתינאים'
        currentObj[newKey] && renameValueInArr(currentObj[newKey], 'CDES', newKey)
    }

    const handleSort = (isAsc, keyToSort) => {
        const sortedTable = sortByKey(kitsSupply, keyToSort, isAsc);
        setKitsSupply(sortedTable)
        // console.log(sortedTable)
    }
    const title = kitsSupply.length ? (
        <tr>
            <th>#</th>
            {TABLE_TITLES.map((currentTitle, index) =>
                Object.entries(currentTitle).map((item, index) =>
                    <th
                        key={index}
                    >
                        {/* <MyDiv>    
                                   */}
                        <RowCenter >
                            <Col lg={6}>
                                {item[1].toUpperCase()}
                            </Col>
                            <Col lg={6}>
                                <Sort
                                    sort={handleSort}
                                    keyToSort={item[0]}
                                />
                            </Col>
                        </RowCenter>
                        {/* </MyDiv> */}
                    </th>
                ))}
        </tr>
    ) : null
    let rowNum = 1;

    const tableContent = (<>
        {kitsSupply.map((currentContent, index) =>
            <TrWithColor key={index}
                marked={currentContent.Y_4795_5_ESHB != null ? 'blue' : null}
            >
                <td>{rowNum++}</td>
                {Object.entries(currentContent).map((item, index) =>
                    <td
                        key={index} name={item[0]}>
                        {item[1] || "Empty"}
                    </td>
                )}
            </TrWithColor>)
        }
    </>)
    const kitsQuant = () => {
        const result = kitsSupply.reduce((accum, curr) => {
            return accum + curr.TQUANT;
        }, 0)
        return result
    }

    const priorityApiLabsListByDate = async (dates) => {
        try {
            setKitsSupply([])

            let result = await getPriorityApiLabsListByDate(dates);
            if (result.error) {
                setError(result.error)
            }
            else {
                result = updateData(result)
                setCustomersList(listOfCustomers(result))
                setKitsSupply(result);
            }

        } catch (e) {
            setError(e.message);
        }
    }
    // console.log("kitsSupply", kitsSupply)
    return (
        <Container >
            {!kitsSupply.length ? <Spinner /> :
                <>

            <Nav />

                    <Row >
                        <Col>
                            <Button className="mb-3 float-right" onClick={logoutHandle}>Log out </Button>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                            <Popup trigger={<Button variant='light' className="mb-3">Filter by date</Button>} position="right center">
                                <div>    <Calendar
                                    apiByDate={priorityApiLabsListByDate}
                                /></div>
                            </Popup>
                        </Col>

                        <SearchByCustomer
                            customersList={customersList}
                            listSupply={setKitsSupply}
                        />
                    </Row>
                    <Row>
                        <Col>
                            <Button variant='info' onClick={priorityApiLabsList}>Refresh </Button>
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