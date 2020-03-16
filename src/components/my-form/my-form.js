import React from 'react';
import {Formik} from 'formik';
import { ContainerForm, MyAlert, MyButton } from './my-form.styled';
import { getInitialFormValues } from '../../utils/form-data';
import schemaYup, { isValuesExist } from '../../utils/validation-form';

const MyForm = ({formData, handleCurrentSubmit, renderFormControls, submitText, error}) =>{

    return(
        <Formik
        onSubmit = {handleCurrentSubmit}
        initialValues={getInitialFormValues(formData)}
        validationSchema={schemaYup(formData)}
        >
        {({errors, touched, handleChange, handleBlur, values, handleSubmit, initialValues, resetForm})=>{
            return(
                <ContainerForm onSubmit = {handleSubmit}>
                {renderFormControls(errors, touched, handleChange, handleBlur, values, initialValues, resetForm)}
                {error && <MyAlert variant="danger">{error}</MyAlert>}
                <MyButton
                            variant="primary"
                            type="submit"
                            // disabled={!isValuesExist(values) || Object.keys(errors).length}
                        >
                            {submitText}
                        </MyButton>
                    </ContainerForm>
            )
        }}
            </Formik>
    )
}

export default MyForm;