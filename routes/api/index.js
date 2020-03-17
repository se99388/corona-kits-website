import express from 'express';
import coronaKits from './corona-kits';
import kits from './kits';

const router  = express.Router();

router.use('/corona-kits', coronaKits);
router.use('/kits', kits);

export default router;

