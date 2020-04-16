import React from 'react';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import { Switch, Route, Redirect, Link, useRouteMatch } from 'react-router-dom';
import CoronaKitsUsers from '../corona-kits-users';
import AllKitsSupply from '../all-kits-status';
import KitsUsersSum from '../kits-users-sum';
import { MyLink } from './nav.styled';
const Nav = () => {
    let match = useRouteMatch();
    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <MyLink to={`${match.url}`}>Corona-kits-users</MyLink> | <MyLink to={`${match.url}all-kits-status`}>Corona-stock-status</MyLink> | <MyLink to={`${match.url}corona-kits-users-sum`}>Summary</MyLink>
                </Col>
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
                        <Route path={`${match.path}corona-kits-users-sum`}>
                            <KitsUsersSum />
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