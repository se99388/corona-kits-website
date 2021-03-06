const CUSTOMERS_TO_JOIN = [`ביוטק מדיקל סאפליי - עייאד רבי`, `לאבטק סופליי קומפני`, `מדיפארם בע'מ`]

export const sort = (arrToSort) =>
    arrToSort.sort((a, b) => {
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

const generalSorting = (arr, key, firstVal, secondVal) => {
    return arr.sort((a, b) => {
        let nameA = a[key]; 
        let nameB = b[key]; 
        if (nameA < nameB) {
            return firstVal;
        }
        if (nameA > nameB) {
            return secondVal;
        }

        // names must be equal
        return 0;
    })
}

export const sortByKey = (arrToSort, key, isAsc) => {
    const newArr = [...arrToSort];
    if (isAsc) {
        return generalSorting(newArr, key, 1, -1)
    }
    return generalSorting(newArr, key, -1, 1)
}


export const renameKey = (obj, newKey, oldKey) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey]

}

export const renameValueInArr = (array, key = null, newValue) => {
    return array.map(el => {
        el[key] = newValue;
    })
};

export const updateData = (data) =>
data.map(item => {
    // item.CURDATE = <Moment format="DD/MM/YYYY">{item.CURDATE}</Moment>
    // item.CURDATE =  Date.parse(item.CURDATE)
    // item.CURDATE =new Date(item.CURDATE).toLocaleDateString('en-US')
item.CURDATE =item.CURDATE.replace(/T.+/g,"")
    if (item.DOCDES == 'החזרה מלקוח') {
        item.TQUANT = item.TQUANT * -1;
    }
    editObject(item, 'CDES', 'Y_8871_5_ESHB');
    editObject(item, 'CUSTNAME', 'Y_4795_5_ESHB');
    
    return item;
});

const editObject = (obj, keyToEdit, keyToAdd) => {
    obj = (obj[keyToAdd]) ? obj[keyToEdit] = `${obj[keyToAdd]}` : null;
}


export const listOfCustomers = (list) => {
    const newObj = list.reduce((accum, curr) => {
        if (!accum[curr.CDES])
            accum[curr.CDES] = []
        accum[curr.CDES].push(curr)
        return accum;
    }, {})

    //add new customer name to the customer list object - it is mutating object
    joinCustomersUnderNewKey(newObj)
    // console.log(newObj)
    return newObj

}

export const joinCustomersUnderNewKey = (currentObj, newKey = 'לקוחות פלשתינאים') => {
    CUSTOMERS_TO_JOIN.map(name => {
        if (currentObj[name]) {
            const oldKey = name;
            if (!currentObj[newKey]) {
                currentObj[newKey] = []
            }
            currentObj[newKey].push(...currentObj[oldKey])
            delete currentObj[oldKey]
        }
    })
    //change customer name in each object int the array to the new key name = 'לקוחות פלשתינאים'
    currentObj[newKey] && renameValueInArr(currentObj[newKey], 'CDES', newKey)
}

export const refreshData=setInterval;

