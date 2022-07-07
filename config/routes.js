const carController = require('../controllers/car');
const usersController = require('../controllers/users');
const refreshController = require('../controllers/refresh');

module.exports = (app) => {
    app.use('/data/cars', carController);
    app.use('/users', usersController);
    app.use('/refresh', refreshController);
};