const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const cookieParser = require('cookie-parser');


start();

async function start() {
    const app = express();
    expressConfig(app);
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    await databaseConfig(app);
    routesConfig(app);


    app.listen(3030, () => { console.log('Server is listening on port 3030') });
};