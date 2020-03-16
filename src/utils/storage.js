export const STORAGE_TOKEN_NAME = 'token';

export const setToLocalStorage = (storageName, storageValue)=>{
    localStorage.setItem(storageName, storageValue);
}

export const getFromLocalStorage = (storageName) => {
    return localStorage.getItem(storageName);
}

export const removeFromLocalStorage = (storageName) => {
    localStorage.removeItem(storageName);
}



    