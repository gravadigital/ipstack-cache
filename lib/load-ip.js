'use strict';
const IpCountry = require('./models/ip-country');
const logger = require('./logger');
const createIpRange = require('./utils/ip').createIpRange;

function loadIp(req, res, next) {
    let ip = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;
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
            req.ipInfo = {
                ip,
                ipCountry
            };
            next();
        })
        .catch((ipError) => {
            logger.error('getIpError: ' + ipError);
            next();
        });
}
module.exports = loadIp;
