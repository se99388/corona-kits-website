import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Alert, FormCheck, Form, DropdownButton, Dropdown } from 'react-bootstrap';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from 'react-select';
import { sort } from '../../../utils/io'
import makeAnimated from 'react-select/animated';

const SearchByCustomer = ({ customersList, listSupply }) => {
    const [checkedCustomers, setCheckedCustomers] = useState([]);

    const searchHandle = () => {
        console.log("checkedCustomers", checkedCustomers)
        const newListSupply = checkedCustomers.map(chosenCustomer =>
            customersList[chosenCustomer.label]
            // customersList[chosenCustomer.value]
            // customersList.filter((item, index) => index === parseInt(chosenCustomer.value))

        );
        console.log("newListSupply", newListSupply)
        listSupply(newListSupply.flat(2));
    }

    const options = () => {
        console.log("customersList", customersList)
        const arr = Object.values(customersList).map((item, index) =>
            ({ label: item[0].CDES, value: item[0].CUSTNAME }))
        return sort(arr);
    }

    const customTheme = (theme) => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: 'orange',
                primary: 'green'
            }
        }
    }
    return (<Container>
        <Row>
            <Col md={4}>
                <Select
                    className="mb-2"
                    options={options()}
                    placeholder='filter by customer'
                    theme={customTheme}
                    isSearchable
                    isMulti
                    noOptionsMessage={() => 'No more customers'}
                    onChange={(selected) => setCheckedCustomers(selected || [])}

                //  autoFocus
                />

            </Col>
            <Col>
                {checkedCustomers.length ? <Button variant="success" className="mb-2" onClick={searchHandle}>filter</Button> : null}
            </Col>
        </Row>
    </Container>)

}

export default SearchByCustomer;