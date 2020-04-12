import React from 'react';
import { Button} from 'react-bootstrap';
import {logout} from '../../services/api';
import { useHistory } from 'react-router-dom';
const Logout=()=>{
    const history = useHistory();
    
    const logoutHandle = async () => {
        const response = await logout();
        if (response.success) {
            history.push('/')
        } else {
            alert('Error')
        }
    }
    return(
        <Button className="mb-3 float-right" onClick={logoutHandle}>Log out </Button>
    )
};

export default Logout;