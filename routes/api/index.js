import express from 'express';
import coronaKits from './corona-kits';

const router  = express.Router();

router.use('/corona-kits', coronaKits);

export default router;

