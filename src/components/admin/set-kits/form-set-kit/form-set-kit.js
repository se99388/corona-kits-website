import React from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import MyForm, { MyAlert } from '../../../my-form';
const FormReward = ({ formData,
    handleCurrentSubmit,
    submitText,
    error }) => {

    return (
        <>
            <MyForm
                formData={formData}
                handleCurrentSubmit={handleCurrentSubmit}
                submitText={submitText}
                error={error}
                renderFormControls={(errors, touched, handleChange, handleBlur, initialValues) => {
                    const allFormData =
                        formData.map((item, index) => (
                            <Form.Group as={Col} key={index} sm={4} >
                                <Form.Label>{item.label}</Form.Label>

                                <Form.Control
                                    type={item.type}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={initialValues[item.name]}

                                />

                                {errors[item.name] && touched[item.name] && (
                                    <MyAlert variant="danger">{errors[item.name]}</MyAlert>
                                )}
                            </Form.Group>
                        ))

                    return (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {allFormData}
                    </div>);
                }}
            />
        </>
    )
}

export default FormReward;