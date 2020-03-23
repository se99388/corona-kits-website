import React from 'react';
import classes from './Spinner.module.css';


const spinner = () =>{

    return(
        <div className={classes.Loader}>
        <img src='/images/spinner.gif'/>
        </div>

    )
}

export default spinner;