import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import KitsSupply from './kits-supply';
import Login from './login';
import Admin from './admin';
import Cookies from 'js-cookie';
import useHtmlTitle from '../hooks/use-html-title';
import AllKitsSupply from './all-kits-status';

const isAuth = () => !!Cookies.get('isa');

const App = () => {
    useHtmlTitle('home')
    return (
        <Container >
            <Row className='pt-2'>
                <Col xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/images/hylabs-logo-s.png" style={{ width: '90%' }} />
                </Col>
                {/* <Col xs={{ span: 3, offset: 6 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/images/moh_clear.png" style={{ width: '100%' }} />
                </Col> */}
            </Row>
            <Row>
                <br />
            </Row>
            <Row className="justify-content-center">
                <Switch>
                    <Route exact path="/"
                    render={(props) => {
                        if (!isAuth()) {
                            return <Login />
                        } else {
                            return <Redirect to="/kits-supply" />;
                        }}}
                    >
                        
                    </Route>
                    <Route exact path="/kits-supply"
                     render={(props) => {
                        if (isAuth()) {
                            return<KitsSupply />
                        } else {
                            return <Redirect to="/" />;
                        }}}>
                    </Route>
                    <Route exact path='/all-kits-status'                    
                    render={(props) => {
                        if (isAuth()) {
                            return  < AllKitsSupply/>
                        } else {
                            return <Redirect to="/" />;
                        }}}>
                    </Route>
                    <Route exact path="/admin"
                     render={(props) => {
                        if (isAuth()) {
                            return   <Admin />
                        } else {
                            return <Redirect to="/" />;
                        }}}>          
                    </Route>
                    <Route>
                        <Redirect to="/"/>
                    </Route>
             
                </Switch>
            </Row>
        </Container>
    );
}

export default App;
