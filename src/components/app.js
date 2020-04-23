import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import KitsSupply from './kits-supply';
import Login from './login';
import Logout from './logout';
import Admin from './admin';
import Cookies from 'js-cookie';
import useHtmlTitle from '../hooks/use-html-title';
import AllKitsSupply from './all-kits-status';
import Nav from './nav'

const isAuth = () => !!Cookies.get('isa');
console.log(isAuth())
const App = () => {
    const [login, setLogin] = useState(isAuth());
    useState(() => {
        setLogin(!!Cookies.get('isa'));
    }, [isAuth()])
    useHtmlTitle('home')
    return (
        <Container >
            <Row className='pt-2' >
                <Col xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/images/hylabs-logo-s.png" style={{ width: '90%' }} />
                </Col>
                <Col>
                    <Route
                        render={() => {
                            if (isAuth()) {
                               return <Logout />
                            }
                        }}
                    >
                    </Route>
                </Col>
            </Row>
            <Row>
                <br />
            </Row>
            <Row className="justify-content-center">
                <Switch>
                    <Route path="/"
                        render={(props) => {
                            if (!isAuth()) {
                                return <Login />
                            } else {
                                return <Nav />
                            }
                        }}
                    >

                    </Route>
                    {/* <Route exact path="/admin"
                        render={(props) => {
                            if (isAuth()) {
                                return <Admin />
                            } else {
                                return <Redirect to="/" />;
                            }
                        }}>
                    </Route> */}
                    <Route>
                        <Redirect to="/" />
                    </Route>

                </Switch>
            </Row>
        </Container>
    );
}

export default App;
