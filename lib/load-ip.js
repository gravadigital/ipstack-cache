'use strict';
const rp = require('request-promise');
const IpCountry = require('./models/ip-country');
const logger = require('./logger');

function createIpRange(requestIp) {
    let ip = requestIp;
    let ipRange = ip.split('.').slice(0, 3).join('.');
    if (ip.indexOf('192.168') !== -1 || ip.indexOf('127.0.0') !== -1) {
        ip = '';
    }
    return rp({
        uri: 'http://freegeoip.net/json/' + ip,
        json: true
    })
        .then((response) => {
            return IpCountry.findOrCreate({
                ipRange,
                country_code: response.country_code,
                country_name: response.country_name,
                region_code: response.region_code,
                region_name: response.region_name,
                city: response.city,
                zip_code: response.zip_code,
                time_zone: response.time_zone,
                latitude: response.latitude,
                longitude: response.longitude,
                metro_code: response.metro_code
            });
        }).then((ipCountry) => {
            return ipCountry.doc;
        });
}

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
            logger.error('getIpInfoError: ' + ipError);
            next();
        });
}
module.exports = loadIp;
