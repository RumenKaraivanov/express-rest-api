const furnitureController = require('../controllers/furnitures');
const usersController = require('../controllers/users');

module.exports = (app) => {
    app.use('/data/catalog', furnitureController);
    app.use('/users', usersController);
};