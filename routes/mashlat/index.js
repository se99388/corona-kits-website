import axios from 'axios';
import express from 'express';
const router = express.Router();

const Authorization = 'Basic QVBJOjEyMzQ';
const instance = axios.create({
    baseURL: 'https://priority.hylabs.co.il/odata/Priority/tabula.ini/h250718/',
    timeout: 8000,
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

//for mashalat
router.get('/labs-list-supply', async (req, res, next) => {
    try {

        console.log(req.headers["authorization"])
        if (req.headers["authorization"] === 'Basic aHlsYWJzOmNvcm9uYSE=') {
            console.log('good')
            const url = "TRANSORDER_DN?$filter=PARTNAME eq 'IMRP10243X' and STATDES eq 'סופית' and (DOCDES eq 'משלוחים ללקוח' or DOCDES eq 'החזרה מלקוח')&$select=PARTNAME,STATDES,DOCDES,CDES,TQUANT,CURDATE,CUSTNAME,Y_8871_5_ESHB,Y_4795_5_ESHB&$orderby=CURDATE desc";
            const encodedURI = encodeURI(url);
            const response = await getPriorityApi(encodedURI);
            res.json(response.data.value);
        } else{
            console.log('wrong')
            res.json({error:'authorization failed'});
        }

    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        res.json({ error });
    }
})

export default router;