import React from 'react';
import { MyTable, TrWithColor, MyDiv, RowCenter } from './kits-supply-table.styled';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import Sort from '../../../ui/sort';

//this componet is the main table in the corona-kits-users page
const KitsSupplyTable=({kitsSupply, tableTitles, sort})=>{
    const title = kitsSupply.length ? (
        <tr>
            <th>#</th>
            {tableTitles.map((currentTitle, index) =>
                Object.entries(currentTitle).map((item, index) =>
                    <th
                        key={index}
                    >
                        {/* <MyDiv>    
                                   */}
                        <RowCenter >
                            <Col lg={6}>
                                {item[1].toUpperCase()}
                            </Col>
                            <Col lg={6}>
                                <Sort
                                    sort={sort}
                                    keyToSort={item[0]}
                                />
                            </Col>
                        </RowCenter>
                        {/* </MyDiv> */}
                    </th>
                ))}
        </tr>
    ) : null
    let rowNum = 1;

    const tableContent = (<>
        {kitsSupply.map((currentContent, index) =>
            <TrWithColor key={index}
                marked={currentContent.Y_4795_5_ESHB != null ? 'blue' : null}
            >
                <td>{rowNum++}</td>
                {Object.entries(currentContent).map((item, index) =>
                    <td
                        key={index} name={item[0]}>
                        {item[1] || "Empty"}
                    </td>
                )}
            </TrWithColor>)
        }
    </>)
    return(
        < MyTable striped bordered hover responsive="xs">
        <thead>
            {title}
        </thead>
        <tbody>
            {tableContent}
        </tbody>
    </MyTable >
    )
}

export default KitsSupplyTable;