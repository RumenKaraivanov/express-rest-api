const carController = require('../controllers/car');
const usersController = require('../controllers/users');


module.exports = (app) => {
    app.use('/data/car', carController);
    app.use('/users', usersController);
   
};