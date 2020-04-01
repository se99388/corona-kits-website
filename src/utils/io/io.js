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


    export const renameKey=(obj,newKey,oldKey)=>{
        obj[newKey] = obj[oldKey];
        delete obj[oldKey]

    }

    export const renameValueInArr =(array,key=null,newValue)=>{
        return array.map(el=>{
            el[key] = newValue;
        })
    }

