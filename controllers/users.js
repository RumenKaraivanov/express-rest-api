const router = require('express').Router();
const mapErrors = require('../utils/mapper');
const { register } = require('../services/user');

router.post('/register', async (req, res) => {

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
    }
});
router.post('/login', async (req, res) => {
    console.log('login')
    res.end();
});
router.get('/logout', async (req, res) => {
    console.log('logout')
    res.end();
});

module.exports = router;