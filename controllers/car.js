const router = require('express').Router();
const { create, getAll, update, deleteById, likeCar } = require('../services/car');
const mapErrors = require('../utils/mapper');
const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');

router.get('/', async (req, res) => {
    const data = await getAll();
    res.json(data);
});
router.post('/likes/:id', isUser(), async (req, res) => {
    const data = await likeCar(req.params.id, req.user._id);
    res.json(data);
});
router.post('/', isUser(), async (req, res) => {
    const car = {
        model: req.body.model,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        _ownerId: req.user._id
    };

    try {
        const result = await create(car);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
    res.end();
});
router.get('/:id', preload(), async (req, res) => {
    const car = await res.locals.item;
    res.json(car);
});
router.put('/:id', preload(), isOwner(), async (req, res) => {
    const car = {
        model: req.body.model,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl
    }
    try {
        const result = await update(req.params.id, car);
        res.json(result);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});
router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        await deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    };
});

module.exports = router;