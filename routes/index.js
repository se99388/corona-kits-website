import express from 'express';
import path from 'path';
import api from './api';
import auth from './auth';

const router = express.Router();

//in case of the server side fall down,  without logout - req.session.isAuth will be removed but the req.cookies['isa'] will be still exist. In this case I need to delete it. I'm not it is must
router.use((req, res, next) => {
    if (!req.session.isAuth && req.cookies['isa']) {
        console.log("isa:", req.cookies['isa']);
        res.clearCookie('isa');
    }
    next();
});

const protect = (req, res, next) => {
    if (!req.session.isAuth) {
        return res.status(500).json({ authorize: false });
    }

    next();
};

router.use('/api',protect, api);

// i define route only for the login - i want to login will be /auth/login and not under /api - its not api!
router.use('/auth', auth);

router.use('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
export default router;