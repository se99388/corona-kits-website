import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import KitsSupply from './kits-supply';
import Login from './login';

const App = () => {
    return (
        <Container >
            <Row  className='pt-2'>
                <Col md={3} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Image src="/images/hylabs-logo-s.png" />
                </Col>
                <Col md={{ span: 3, offset: 6 }} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Image src="/images/moh.jpg" />
                </Col>
            </Row>
            <Row>
                <br/>
                </Row>
            <Row className="justify-content-center">
                <Switch>
                    <Route exact path="/">
                        <Login />
                        </Route>
                        <Route exact path="/kits-supply">
                            <KitsSupply />
                        </Route>
                    </Switch>
            </Row>
        </Container>
                );
            }
            
            export default App;
