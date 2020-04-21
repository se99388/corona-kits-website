
import axios from 'axios';
import express from 'express';
const router = express.Router();

const Authorization = process.env.PRIORITY_AUTHORIZATION;
const instance = axios.create({
    baseURL: process.env.PRIORITY_URL,
    timeout: 8000,
    method: 'get',
    headers: {
        Authorization,
        'Content-type': 'application/json'
    },
    auth: {
        username: process.env.PRIORITY_USERNAME,
        password: process.env.PRIORITY_PASS
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

router.get('/in-stock/:partname', async (req, res, next) => {
    try {
        // const partname = req.params.partname;
        const partname = JSON.parse(req.params.partname);
        const oDataText = `PARTNAME eq '${partname.join(`' or PARTNAME eq '`)}'`;
        const url = `LOGPART?$filter=${oDataText}&$select=PARTNAME,EPARTDES&$expand=LOGCOUNTERS_SUBFORM($select=BALANCE)`;

        const response = await getPriorityApi(url);
        res.json(response.data.value)
    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        res.json({ error });
    }
})

router.get('/all-kits-in-stock-notes', async (req, res, next) => {
    try {
        //without select
        // const url = "PORDERS?$filter=SUPNAME eq '55921' or SUPNAME eq '57046' or SUPNAME eq '55222' or SUPNAME eq '55289' or SUPNAME eq '55697' and CLOSEDBOOL eq ''&$expand=PORDERITEMS_SUBFORM($filter=CLOSEDBOOL eq '' and (PARTNAME eq 'TTS238' or PARTNAME eq 'CAP250' or PARTNAME eq 'IM235905' or PARTNAME eq 'IMHSP9655' or PARTNAME eq 'IMTCS0803' or PARTNAME eq 'IM235903' or PARTNAME eq 'IM7443004U' or PARTNAME eq 'IMRP10243X' or PARTNAME eq 'IMSDP0096');$expand=PORDERITEMSTEXT_SUBFORM)";

        //with select
        
        const url = "PORDERS?$filter=SUPNAME eq '55921' or SUPNAME eq '57046' or SUPNAME eq '55222' or SUPNAME eq '55289' or SUPNAME eq '55697' or SUPNAME eq '55044' or SUPNAME eq '57271' or SUPNAME eq '55349' and CLOSEDBOOL eq ''&$expand=PORDERITEMS_SUBFORM($filter=CLOSEDBOOL eq '' and (PARTNAME eq 'TTS238' or PARTNAME eq 'CAP250' or PARTNAME eq 'IM235905' or PARTNAME eq 'IMHSP9655' or PARTNAME eq 'IMTCS0803' or PARTNAME eq 'IM235903' or PARTNAME eq 'IM7443004U' or PARTNAME eq 'IMRP10243X' or PARTNAME eq 'IMSDP0096' or PARTNAME eq 'MBC0097' or PARTNAME eq 'IMHW4412' or PARTNAME eq 'IMR2141'); $select=KLINE,PARTNAME,PDES,CLOSEDBOOL;$expand=PORDERITEMSTEXT_SUBFORM)&$select=SUPNAME,CURDATE,STATDES,ORDNAME";

        const response = await getPriorityApi(url);
        res.json(response.data.value)
    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        res.json({ error });
    }
})
 
router.get('/all-kits-in-stock', async (req, res, next) => {
    try {
        const url = "LOGPART?$filter=PARTNAME eq 'IMRP10243X' or PARTNAME eq 'IM235905' or PARTNAME eq 'IM235903' or PARTNAME eq 'IMSDP0096' or PARTNAME eq 'IM7443004U' or PARTNAME eq 'IMHSP9655' or PARTNAME eq 'IMTCS0803' or PARTNAME eq 'TTS238' or PARTNAME eq 'CAP250' or PARTNAME eq 'MBC0097' or PARTNAME eq 'IMHW4412' or PARTNAME eq 'IMR2141' &$select=PARTNAME,EPARTDES&$expand=LOGCOUNTERS_SUBFORM($select=BALANCE,PORDERS)";

        const response = await getPriorityApi(url);
        res.json(response.data.value)
    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        res.json({ error });
    }
})

router.get('/labs-list-supply/:partname', async (req, res, next) => {
    try {
        const partname = JSON.parse(req.params.partname);
        const startDate='2020-03-12'
        const oDataText = `PARTNAME eq '${partname.join(`' or PARTNAME eq '`)}'`;

        const url = `TRANSORDER_DN?$filter=(${oDataText}) and STATDES eq 'סופית' and CURDATE ge ${startDate} and (DOCDES eq 'משלוחים ללקוח' or DOCDES eq 'החזרה מלקוח')&$select=PARTNAME,STATDES,DOCDES,CDES,TQUANT,CURDATE,CUSTNAME,Y_8871_5_ESHB,Y_4795_5_ESHB&$orderby=CURDATE desc`;
        const encodedURI = encodeURI(url);
        const response = await getPriorityApi(encodedURI);
        res.json(response.data.value)
    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        res.json({ error });
    }
})

router.post('/labs-list-supply-by-date', async (req, res, next) => {
    try {
        const {startDate, endDate} = req.body.date;
        const {partname} = req.body;
 
        const oDataText = `PARTNAME eq '${partname.join(`' or PARTNAME eq '`)}'`;
        const url = `TRANSORDER_DN?$filter=(${oDataText}) and STATDES eq 'סופית' and CURDATE ge ${startDate} and CURDATE le ${endDate} and (DOCDES eq 'משלוחים ללקוח' or DOCDES eq 'החזרה מלקוח')&$select=PARTNAME,STATDES,DOCDES,CDES,TQUANT,CURDATE,CUSTNAME,Y_8871_5_ESHB,Y_4795_5_ESHB&$orderby=CURDATE desc`;
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