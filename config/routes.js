const furnitureController = require('../controllers/furnitures');

module.exports = (app) => {
    app.use('/data/catalog', furnitureController);
};