const router = require('express').Router();
const mapErrors = require('../utils/mapper');
const { register, login, logout } = require('../services/user');
const { isGuest, isUser } = require('../middlewares/guards');

router.post('/register', isGuest(), async (req, res) => {

    try {
        if (req.body.email?.trim() == '' || req.body.password?.trim() == '') {
            throw new Error('All fields are required!');
        };
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password?.trim();
        const result = await register(email, password, res);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    };
});
router.post('/login', isGuest(), async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password?.trim();
        const result = await login(email, password, res);
        res.json(result);
    } catch (err) {
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    };
});
router.get('/logout', isUser(), (req, res) => {
    logout(req.user.token);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.end();
});

module.exports = router;