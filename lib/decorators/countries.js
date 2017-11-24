'use strict';
const logger = require('../logger');
function userDecorator(controller) {
    controller.request('post put delete', function(req, res, next) {
        logger.info('unauthorized operation');
        res.status(401).json({message:'unauthorized'});
        next();
    });
}
module.exports = userDecorator;
