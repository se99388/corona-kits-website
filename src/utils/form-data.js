
export const getInitialFormValues = data =>
    data.reduce((acc, curr) => {
        acc[curr.name] = curr.value || '';
        return acc;
    }, {});
