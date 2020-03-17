import React, { useEffect, useState } from 'react';
import SubHeader from '../../sub-header';
import {setKitData} from './set-kit-data'
import { addKit, removeKit, updateKit, getKits } from '../../../services/api';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import FormSetKit from '../set-kits/form-set-kit';

const SetSubHeader = () => {

    const [kitDetails, setKitDetails] = useState('');
    const [updateRow, setUpdateRow] = useState([]);
    const [idCurrentRow, setIdCurrentRow] = useState(null);
    const [ifUpdate, setIfUpdate] = useState('false');
    const [error, setError] = useState(null);
    const updateKitDetail = async () => {
        const response = await getKits();
        const newObj = { ...response[0] };
        newObj.catNum = newObj.catalog_number;
        delete newObj.catalog_number;

        let rowDataWithValue = setKitData.map(obj => { return { ...obj } });
        rowDataWithValue = rowDataWithValue.map((item) => {
            item.value = newObj[item.name];
            return item;
        })
        setUpdateRow(rowDataWithValue);
        setIdCurrentRow(newObj.id);
        setKitDetails(newObj);
    }

    const handleSubmit = (apiFunc, id = null) => async ({ ...newState }) => {
       
        try {
            newState.id = id;
            const response = await apiFunc(newState);
            if (response.error) {
                setError(response.error)
            }
            else {
                setIfUpdate('true');
                setError(null);
                resetStates();

            }

        } catch (e) {
            setError(e.message)
        }
    }

    const resetStates = () => {
        setUpdateRow([])
        setError(null);
    }
    return (
        <Container>
            <Row>
                <SubHeader update={ifUpdate}/>
            </Row>
            <Row>
                <Button variant="outline-light" onClick={updateKitDetail}>
                    <img src='/images/edit.png' />
                </Button>
            </Row>
 <Row>
            <Col>
            {updateRow.length ? <FormSetKit
                formData={updateRow}
                handleCurrentSubmit={handleSubmit(updateKit, idCurrentRow)}
                submitText="Save updated row"
                error={error}
            /> : null}
            </Col>
        </Row>
        </Container>
    )
};

export default SetSubHeader;