'use strict';
const request = require('request-promise');
const {IpZone} = require('../models');
const IPSTACK_TOKEN = process.env.IPSTACK_TOKEN;
const IPSTACK_URL = process.env.IPSTACK_URL;

function createIpRange(requestIp) {
    let ip = requestIp;
    let ipRange = ip.split('.').slice(0, 3).join('.');
    if (ip.indexOf('192.168') !== -1 || ip.indexOf('127.0.0') !== -1) {
        throw new Error('invalid_local_ip');
    }
    return request({
        uri: `${IPSTACK_URL}${ip}`,
        method: 'GET',
        qs: {
            access_key: IPSTACK_TOKEN
        },
        json: true
    })
        .then((response) => {
            return IpZone.create({
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
        })
        .then((ipCountry) => {
            return ipCountry;
        });
}

module.exports = {
    createIpRange
};
