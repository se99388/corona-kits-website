import * as yup from 'yup';


export const schemaYup = (data) => {
    const yupScheme = data.reduce((acc, curr) => {
        acc[curr.name] = curr.yup;
        return acc;
    }, {});

    return yup.object().shape(yupScheme);
};

export const isValidate = (currentObj, formData) => {
    let schema = schemaYup(formData);
    return schema.strict().validate(currentObj);
};

export const isValuesExist = values => {
    for (let key in values) {
        if (values[key] !== '') {
            return true;
        }
    }
    return false;
};


export default schemaYup;
