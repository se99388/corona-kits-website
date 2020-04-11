import axios from 'axios';

const instance = axios.create({
    baseURL: '/',
    timeout: 10000,
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
});


const handler = async options => {
    try {
        //here i'm sending request. options means for change or add other parameters to the current request
        const result = await instance(options);
        return result.data;
    } catch (ex) {
        console.log("axios error:", ex.message);
        throw ex;
    }
};


//for kits-supply
export const getKitsSupply = () => {
    return handler({
        url: '/api/corona-kits'
    });
};

export const addKitToKitSupply = (value) => {
    console.log("value:", value)
    return handler({
        method: 'POST',
        url: '/api/corona-kits',
        data: value
    });
};

export const removeKitSupply = (id) => {
    return handler({
        url: `/api/corona-kits/${id}`,
        method: 'DELETE'
    });
};

export const updateKitSupply = (value) => {
    return handler({
        method: 'PUT',
        url: '/api/corona-kits',
        data: value
    });
};


//for kits
export const getKits = () => {
    return handler({
        url: '/api/kits'
    });
};

export const addKit = (value) => {
    return handler({
        method: 'POST',
        url: '/api/kits',
        data: value
    });
};

export const removeKit = (id) => {
    return handler({
        url: `/api/kits/${id}`,
        method: 'DELETE'
    });
};

export const updateKit = (value) => {
    return handler({
        method: 'PUT',
        url: '/api/kits',
        data: value
    });
};

export const login = (username, password) => {
    return handler({
        url: '/auth/login',
        method: 'POST',
        data: { username, password }
    });
};

export const logout = () => {
    return handler({
        url: 'auth/logout',
        method: 'GET'
    })
}


export const getPriorityApiKitInStock = (partname) => {
    return handler({
        url:`/api/priority-api/in-stock/${partname}`
    });
};

export const getPriorityApiAllKitsInStockNotes = () => {
    return handler({
        url: '/api/priority-api/all-kits-in-stock-notes'
    });
};

export const getPriorityApiAllKitsInStock = () => {
    return handler({
        url: '/api/priority-api/all-kits-in-stock'
    });
};

export const getPriorityApiLabsList = (partname) => {
    return handler({
        url: `/api/priority-api/labs-list-supply/${partname}`
    });
};


export const getPriorityApiLabsListByDate = (value) => {
    return handler({
        method:'POST',
        url: '/api/priority-api/labs-list-supply-by-date',
        data: value
    });
};

