import axios from 'axios';

const instance = axios.create({
    baseURL: '/',
    timeout: 5000,
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

export const getKitsSupply = () =>{
    return handler({
        url:'/api/corona-kits'
    });
};