import axios from 'axios';
import express from 'express';
const router = express.Router();

const Authorization = 'Basic QVBJOjEyMzQ';
const instance = axios.create({
    baseURL: 'https://priority.hylabs.co.il/odata/Priority/tabula.ini/h250718/',
    timeout: 5000,
    method: 'get',
    headers: {
        Authorization,
        'Content-type': 'application/json'
    },
    auth: {
        username: 'API',
        password: '1234'
    },
});

const getPriorityApi = async (url) => {
    try {
        const data = await instance({
            url: url,
        })
        return data;
    } catch (e) {
        throw e
    }
}

router.get('/in-stock', async (req, res, next) => {
    try {
        const url = "LOGPART?$filter=PARTNAME eq 'IMRP10243X'&$select=PARTNAME,EPARTDES&$expand=LOGCOUNTERS_SUBFORM($select=BALANCE)";

        const response = await getPriorityApi(url);
        res.json(response.data.value)
    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        res.json({ error });
    }
})

router.get('/labs-list-supply', async (req, res, next) => {
    try {
        const url = "TRANSORDER_DN?$filter=PARTNAME eq 'IMRP10243X' and STATDES eq 'סופית' and (DOCDES eq  'משלוחים ללקוח' or DOCDES eq 'החזרה מלקוח')&$select=PARTNAME,STATDES,DOCDES,CDES,TQUANT,CURDATE";
        const encodedURI = encodeURI(url);
        const response = await getPriorityApi(encodedURI);
        res.json(response.data.value)
    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        res.json({ error });
    }
})



export default router;