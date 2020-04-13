import React from 'react';
import {Toolbar} from './navigation.styled';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Nav from '../../nav'
const Navigation = (props)=>{

    return(
        <Toolbar>
            <div>
            <Image src="/images/hylabs-logo-s.png" style={{ width: '90%' }} />
                </div>
                <nav>
              
                    </nav>
            </Toolbar>
    )
}

export default Navigation;