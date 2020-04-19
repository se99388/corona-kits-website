import React from 'react';
import { Table,Row, Col } from 'react-bootstrap';
import {GeneralTable} from './users-sum-table.styled';
import Sort from '../../ui/sort';
const UsersSumTable=({tableOrderData, tableContent, sort})=>{

    const title = (
        <tr>
            <th>#</th>
            {tableOrderData.map((keyItem, index) =>
           
                
                <th key={index}>
                 <Row>
                <Col lg={6}>
                {keyItem.title.toUpperCase()}
                </Col>
                <Col lg={6}>
                <Sort 
                sort={sort}
                keyToSort={keyItem.field}
                />
                 </Col>
                 </Row>
                </th>
               
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
        < GeneralTable striped bordered hover responsive="xs" className="mt-3">
        <thead>
            {title}
        </thead>
        <tbody>
            {content}
        </tbody>
    </GeneralTable >
    )
}

export default UsersSumTable;
