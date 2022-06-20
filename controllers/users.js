const router = require('express').Router();
const mapErrors = require('../utils/mapper');
const { register, login, logout } = require('../services/user');
const { isGuest } = require('../middlewares/guards');

router.post('/register', isGuest(), async (req, res) => {

    try {
        if (req.body.email.trim() == '' || req.body.password.trim() == '') {
            throw new Error('All fields are required!');
        };

        const email = req.body.email.trim().toLowerCase();
        const password = req.body.email.trim();

        const result = await register(email, password);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    };
});
router.post('/login', isGuest(), async (req, res) => {
    try {
        const email = req.body.email.trim().toLowerCase();
        const password = req.body.email.trim();

        const result = await login(email, password);
        res.json(result);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    };
});
router.get('/logout', async (req, res) => {
    logout(req.user.token);
    res.end();
});

module.exports = router;