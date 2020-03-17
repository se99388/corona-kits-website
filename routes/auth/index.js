import express from 'express';
import login from './login';
import logout from './logout';

const router = express.Router();
router.use('/logout',logout)
router.use('/login', login);

export default router;
