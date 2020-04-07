import React from 'react';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import {GeneralTable} from './table.styled';

const MyTable = ({tableContent, tableOrderData})=>{

    const title = (
        <tr>
            <th>#</th>
            {tableOrderData.map((keyItem, index) =>
                <th key={index}>{keyItem.title.toUpperCase()}</th>
            )}
        </tr>
    )
    let rowNum = 1;

    const content = (<>
        {tableContent.map((currentContent, index) =>
            <tr key={index}>
                <td>{rowNum++}</td>
                {tableOrderData.map((keyItem, index) =>
                    <td      style={{ direction: 'rtl'}}  
                  key={index}>
                        {currentContent[keyItem.field]}
                    </td>
                )}
            </tr>)
        }
       </> )

        return(
            < GeneralTable striped bordered hover responsive="lg">
                        <thead>
                            {title}
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </GeneralTable >
        )
}

export default MyTable;