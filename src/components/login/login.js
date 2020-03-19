import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../services/api';
import { useHistory } from 'react-router-dom';
import { ContainerForm, MyAlert, MyButton } from '../my-form/my-form.styled';
import useHtmlTitle from '../../hooks/use-html-title';

const Login = () => {
    useHtmlTitle('hylabs login')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const onChangeInput = setValue => e => setValue(e.target.value);

    return (
        <ContainerForm>
            
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={onChangeInput(setUsername)}
                />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChangeInput(setPassword)}
                />
            </Form.Group>
            <MyButton
                variant="primary"
                type="submit"
                onClick={async e => {
                    e.preventDefault();
                    const res = await login(username, password);
                    if (res.success) {
                        history.push('/kits-supply');
                    } else {
                        alert('wrong username or password!');
                    }
                }}
            >
                Submit
            </MyButton>
        </ContainerForm>
    );
};

export default Login;
