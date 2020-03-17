import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username === 'coronahylabs' && password === '1234') {
        // after succesfull login i save to the user key boolean "isAuth" and i set it to true
        // this is now how the server knows that the user is authorized cause its save this data for the user
        // by its session cookie - look at the explanation in "server.js"
        req.session.isAuth = true;
        res.cookie('isa', new Date().getTime());
        // i return to the user sucess true so he will continue to the loading of the page in javascript
        // this is a SPA so i use in the client history.push("/admin");
        return res.json({ success: true });
    }

    res.json({ error: 'auth error!' });
});

export default router;
