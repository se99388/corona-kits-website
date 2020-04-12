import React from 'react';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import { Switch, Route, Redirect, Link, useRouteMatch } from 'react-router-dom';
import KitsSupply from '../kits-supply';
import CoronaKitsUsers from '../corona-kits-users';
import AllKitsSupply from '../all-kits-status';
import { MyLink } from './nav.styled';
import Logout from '../logout';
const Nav = () => {
    let match = useRouteMatch();
    return (
        <Container>
            <Row >
                <Col>
                    <Logout />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <div>
                    <MyLink to={`${match.url}`}>Corona-kits-users</MyLink> | <MyLink to={`${match.url}all-kits-status`}>Corona-stock-status</MyLink>
                </div>
            </Row>
            <Row>
                <Col>
                    <Switch>
                        <Route exact path={`${match.path}`}>
                            <CoronaKitsUsers />
                        </Route>
                        <Route path={`${match.path}all-kits-status`}>
                            <AllKitsSupply />
                        </Route>
                        <Route>
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Container>

    )
}

export default Nav;