const router = require('express').Router();
const { create, getAll, getOneById, update, deleteById } = require('../services/furniture');
const mapErrors = require('../utils/mapper');


router.get('/', async (req, res) => {
    const data = await getAll();
    res.json(data);
});
router.post('/', async (req, res) => {
    const furiture = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material
    };

    try {
        const result = await create(furiture);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});
router.get('/:id', async (req, res) => {
    const furiture = await getOneById(req.params.id);
    res.json(furiture);
});
router.put('/:id', async (req, res) => {
    const furiture = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material
    }
    try {
        const result = await update(req.params.id, furiture);
        res.json(result);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    };
});


module.exports = router;