import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Alert, FormCheck, Form, DropdownButton, Dropdown } from 'react-bootstrap';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Select from 'react-select';
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
        console.log("newListSupply",newListSupply)
        listSupply(newListSupply.flat(2));
    }

    const options = () => {
        console.log("customersList",customersList)
        const arr = Object.values(customersList).map((item, index) => {
            return { label: item[0].CDES, value: item[0].CUSTNAME }
        })
        arr.sort((a, b) => {
            let nameA = a.label.toUpperCase(); // ignore upper and lowercase
            let nameB = b.label.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        })
        return arr;
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
                    onChange={setCheckedCustomers}

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