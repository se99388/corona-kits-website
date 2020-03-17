import * as yup from 'yup';

export const setKitsData = [
    // {
    //     type: 'text',
    //     label: 'Id:',
    //     placeholder: 'Enter your ID',
    //     name: 'id',
    //     yup: yup.string().required('Write your id')
    // },
    {
        type: 'text',
        label: 'Kit name:',
        placeholder: 'Enter kit name',
        name: 'name',
        value: '',
        // yup: yup.string().required('Write the kit name')
    },
    {
        type: 'text',
        label: 'Catalog number:',
        placeholder: 'Enter catalog number',
        name: 'catNum',
        value: '',
        // yup: yup.string().required('Write the kit name')
    },
    {
        type: 'number',
        label: 'Quantity',
        placeholder: 'Enter quantity',
        name: 'quantity',
        value: '',
        yup: yup
            .number('Has to be a number')
            .min(0,'Has to be 0 or more')
            .required('Write your quantity')
    },
    {
        type: 'text',
        label: 'Location:',
        placeholder: 'Enter location',
        name: 'location',
        value: '',
        yup: yup.string().required('Write the location')
    },
    {
        type: 'date',
        label: 'Date:',
        name: 'date',
        value: '',
        yup: yup.string().required('Write the date supply')
    }
];
