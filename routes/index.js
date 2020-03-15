import express from 'express';
import path from 'path';
import api from './api';

const router = express.Router();

router.use('/api',api);

router.use('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
export default router;