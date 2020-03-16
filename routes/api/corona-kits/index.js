import express from 'express';
import { getKitsSupply, addKit, removeKitSupply, updateKitSupply } from '../../../db/kits-supply';

const router = express.Router();

router.get('/', async (req, res) => {
    let kitsSupply = await getKitsSupply();
    res.json(kitsSupply);
});

router.post('/', async (req, res) => {
    try {
        console.log("req.body:",req.body)
        const { name, catNum, location, quantity, date } = req.body;
        //make here validation!
        const addedKit = await addKit(name, catNum, location, quantity, date);
        res.json(addedKit);
    } catch (e) {
        let error = 'Server Error! please try again later';
        res.json({error})
    }
});

router.delete("/:id", async (req, res) => {
    const deleteRow = await removeKitSupply(req.params.id);
    console.log(deleteRow)
    res.json(deleteRow).status(204);
});

router.put("/", async (req, res) => {
    try {
        
        const { id, name, catNum, location, quantity, date } = req.body;

        //make here validation!
        const responseUpdatedRow = await updateKitSupply(id, name, catNum, location, quantity, date)
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