import {query} from './pg';

export const getRows = async (text, ...params) =>{
    const {rows} = await query(text, params);
    return rows;
}

export const getSingleRow = async (text, ...arg) =>{
    const rows = await getRows(text, ...arg);
    return rows[0];
}