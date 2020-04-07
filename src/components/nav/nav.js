import React from 'react';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import {MyLink} from './nav.styled';
const Nav=()=>{

    return(
        <Row className="justify-content-center">
        <div>
        <MyLink to='/kits-supply'>Corona-kits-users</MyLink> | <MyLink to='/all-kits-status'>Corona-stock-status</MyLink>
        </div>
    </Row>
    )
}

export default Nav;