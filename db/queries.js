import {query} from './pg';

export const getRows = async (text, ...params) =>{
    const {rows} = await query(text, params);
    return rows;
}