import express from 'express';
import coronaKits from './corona-kits';
import kits from './kits';
import priorityApi from './priority-api';

const router  = express.Router();

router.use('/corona-kits', coronaKits);
router.use('/kits', kits);
router.use('/priority-api', priorityApi);

export default router;

