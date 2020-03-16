import React, { useEffect, useState } from 'react';
import { getKitsSupply, addKitToKitSupply, updateKitSupply,removeKitSupply } from '../../../services/api';
import { Row, Col, Container, Button } from 'react-bootstrap';
import FormSetKit from './form-set-kit';
import {setKitsData} from './set-kits-data';
import SetKitsTable from './set-kits-table';

const SetKits = () => {
    const [kitsSupply, setKitsSupply] = useState([]);
    const [deleteKit, setDeleteKit] = useState('');
    const [addRowdBtn, setAddRowBtn] = useState('Add new row');
    const [newRowForm, setNewRowForm] = useState([]);
    const [updateRow, setUpdateRow] = useState([]);
    const [idCurrentRow, setIdCurrentRow] = useState(null);
    const [newKit, setNewKit] = useState(false);
    const [error, setError] = useState(null);

    const KitsSupplyData = async () => {
        try {
            const response = await getKitsSupply();
            console.log(response);
            setKitsSupply(response);
        } catch (e) {
            setError(e.message);
        }
    }

    useEffect(() => {
        KitsSupplyData()
    }, [])

    const handleNewRow = () => {
        setNewRowForm((prevState) => {
            if (prevState.length) {
                resetStates()
                return [];
            }
            else {
                setAddRowBtn('Cancel new row');
                return setKitsData;
            }
        });
        //call the list of hospitals
    }

    const resetStates = () => {
        setUpdateRow([])
        setNewRowForm([]);
        setError(null);
        setAddRowBtn('Add new row');
    }

    const handleSubmit = (apiFunc, id = null) => async ({ ...newState }) => {
       
        try {
            newState.id = id;
            const response = await apiFunc(newState);
            if (response.error) {
                setError(response.error)
            }
            else {
                setError(null);
                resetStates();
                KitsSupplyData();
            }

        } catch (e) {
            setError(e.message)
        }
    }

    const initalUpdateForm = (currentRow) => {
        
        const newCurrentRow = {...currentRow}
        newCurrentRow.name = newCurrentRow.kit_name;
        newCurrentRow.catNum = newCurrentRow.catalog_number;
        delete newCurrentRow.kit_name;
        delete newCurrentRow.catalog_number;
        console.log(newCurrentRow)
        let rowDataWithValue = setKitsData.map(obj => { return { ...obj } });
        rowDataWithValue = rowDataWithValue.map((item) => {
            item.value = newCurrentRow[item.name];
            return item;
        })
        setUpdateRow(rowDataWithValue);
        setIdCurrentRow(currentRow.id);
    }

    const handleRemoveRow = async (id) => {
        try {
            await removeKitSupply(id);
            resetStates();
            KitsSupplyData();
        } catch (e) {
            setError(e.message)
        }
    }

    return (<Container>
        <Row>
            <Col>
                    <SetKitsTable
                        kitsSupply={kitsSupply}
                        edit={initalUpdateForm}
                        deleteKit={handleRemoveRow}
                        isNewFormOpen = {newRowForm.length}
                    />
            </Col>
        </Row>
        <Button disabled={updateRow.length} variant="dark" onClick={handleNewRow}>{addRowdBtn}</Button>

        <Row>
            <Col>
            {newRowForm.length ? <FormSetKit
                formData={newRowForm}
                handleCurrentSubmit={handleSubmit(addKitToKitSupply)}
                submitText="Save"
                error={error}
            /> : null}
            {updateRow.length ? <FormSetKit
                formData={updateRow}
                handleCurrentSubmit={handleSubmit(updateKitSupply, idCurrentRow)}
                submitText="Save updated row"
                error={error}
            /> : null}
            </Col>
        </Row>
    </Container>
    )
}

export default SetKits;