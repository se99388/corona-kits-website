import React from 'react';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import {GeneralTable} from './table.styled';

const MyTable = ({tableTitles, tableContent})=>{

    const title = (
        <tr>
            <th>#</th>
            {tableTitles.map((item, index) =>
                <th key={index}>{item.toUpperCase()}</th>
            )}
        </tr>
    )
    let rowNum = 1;

    const content = (<>
        {tableContent.map((currentContent, index) =>
            <tr key={index}>
                <td>{rowNum++}</td>
                {Object.entries(currentContent).map((item, index) =>
                    <td        
                    key={index} name={item[0]}>
                        {item[1]}
                    </td>
                )}
            </tr>)
        }
       </> )

        return(
            < GeneralTable striped bordered hover responsive="xs">
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