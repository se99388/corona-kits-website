import express from 'express';
import {getKitsSupply} from '../../../db/kits-supply';

const router  = express.Router();

router.get('/', async(req,res)=>{
    const kitsSupply = await getKitsSupply();
    res.json(kitsSupply)
});

export default router;