'use strict';
const express = require('express');
const router = express.Router();
const IpCountry = require('../models/ip-country');
const logger = require('../logger');
const createIpRange = require('../utils/ip').createIpRange;
function getIp(req) {
    return req.params.ip || req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
}
function loadIp(req, res) {
    let ip = getIp(req);
    ip = ip.toString() === '::1' ? '127.0.0.1' : ip;
    ip = ip.match(/[0-9.]{7,16}/ig).join();
    let ipRange = ip.split('.').slice(0, 3).join('.');
    IpCountry.findOne({
        ipRange
    })
        .then((ipCountry) => {
            if (!ipCountry) {
                return createIpRange(ip);
            }
            return ipCountry;
        })
        .then((ipCountry) => {
            res.json(ipCountry);
        })
        .catch((ipError) => {
            logger.error('getIpError: ' + ipError);
            res.status(400).json({message:'error'});
        });
}

router.get('/:ip?', loadIp);
module.exports = router;
