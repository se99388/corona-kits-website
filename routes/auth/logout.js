import express from 'express';

const router = express.Router();

router.get("/", (req,res)=>{

    if (req.session.isAuth){
        delete req.session.isAuth;
        res.clearCookie('isa')
        return res.json({ success: true });
    }
    res.json({ error: 'auth error!' });
})

export default router;