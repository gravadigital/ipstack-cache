'use strict';
require('dotenv').config();
const app = require('../app');
const logger = require('../lib/logger');

return app.connectMongoose()
    .then(() => {
        const application = app.initialize();
        application.listen(process.env.SERVER_PORT);
        logger.info(`Your server is listening on port ${process.env.SERVER_PORT}`);
    })

    .catch((err) => {
        logger.error('ERROR: ', err);
        return process.exit(1);
    });
