import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import {Background} from './root.styled';

const Root = () => {
    return (
        <Background >
        <BrowserRouter>
        <App />
    </BrowserRouter>
       </Background>
       
    );
};

export default Root;
