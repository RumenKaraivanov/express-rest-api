const express = require('express');
const cors = require('cors');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use(express.json());
    app.use(auth());
};