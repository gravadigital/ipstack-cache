'use strict';
const express = require('express');
const router = express.Router();
const {IpZone} = require('../models');
const logger = require('../logger');
const createIpRange = require('../utils/ip').createIpRange;

function getIp(req) {
    return req.params.ip || req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
}

router.get('/ip/:ip?', (req, res) => {
    let ip = getIp(req);
    console.log('ip 0', ip);
    ip = ip.toString() === '::1' ? '127.0.0.1' : ip;
    console.log('ip 1', ip);
    ip = ip.match(/[0-9.]{7,16}/ig).join();
    console.log('ip 2', ip);
    const ipRange = ip.split('.').slice(0, 3).join('.');
    console.log('ipRange', ipRange);
    return IpZone.findOne({
        ipRange
    })
        .then((ipZone) => {
            if (!ipZone) {
                return createIpRange(ip);
            }
            return ipZone;
        })
        .then((ipZone) => {
            return res.json(ipZone);
        })
        .catch((error) => {
            if (error.message === 'invalid_local_ip') {
                return res.status(400).json({
                    code: 'invalid_local_ip',
                    message: 'Invalid ip (cant be local)'
                });
            }
            logger.error(`GET /ip error: ${error.message}`);
            return res.status(500).json({
                code: 'internal_error',
                message: 'Internal error'
            });
        });
});

module.exports = router;
