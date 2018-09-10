'use strict';
const rp = require('request-promise');
const IpCountry = require('../models/ip-country');
function createIpRange(requestIp) {
    let ip = requestIp;
    let ipRange = ip.split('.').slice(0, 3).join('.');
    if (ip.indexOf('192.168') !== -1 || ip.indexOf('127.0.0') !== -1) {
        ip = '';
    }
    return rp({
        uri: `http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_TOKEN}&output=json&legacy=1`,
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

module.exports = {
    createIpRange
};
