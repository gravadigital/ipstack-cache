'use strict';
const hiroki = require('hiroki');
const models = require('./lib/models');
const decorators = require('./lib/decorators');

function buildHiroki() {
    Object.keys(models).forEach((modelName) => {
        const controller = hiroki.rest(models[modelName]);
        if (decorators.hasOwnProperty(modelName)) {
            decorators[modelName](controller);
        }
    });

    return hiroki.build();
}

module.exports = buildHiroki;
