import express from 'express';
import { getKits, addKit, removeKit, updateKit } from '../../../db/kits';

const router = express.Router();

router.get('/', async (req, res) => {
    const kits = await getKits();
    res.json(kits);
});

router.post('/', async (req, res) => {
    try {
        console.log("req.body:",req.body)
        const { name, catNum, quantity } = req.body;
        //make here validation!
        const addedKit = await addKit(name, catNum, quantity);
        res.json(addedKit);
    } catch (e) {
        let error = 'Server Error! please try again later';
        res.json({error})
    }
});

router.delete("/:id", async (req, res) => {
    const deleteRow = await removeKit(req.params.id);
    console.log(deleteRow)
    res.json(deleteRow).status(204);
});

router.put("/", async (req, res) => {
    try {
        
        const { id, name, catNum, quantity } = req.body;

        //make here validation!
        const responseUpdatedRow = await updateKit(id, name, catNum, quantity);
        console.log(responseUpdatedRow);
        res.json(req.body);

    } catch (e) {
        let error = 'Server Error! please try again later';
        console.log(e)
        if (e.name === 'ValidationError') {
            error = e.message;
        }
        res.json({ error });
    }

});

export default router;