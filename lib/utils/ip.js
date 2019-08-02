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
                countryCode: response.country_code,
                countryName: response.country_name,
                regionCode: response.region_code,
                regionName: response.region_name,
                city: response.city,
                zipCode: response.zip_code,
                timeZone: response.time_zone,
                latitude: response.latitude,
                longitude: response.longitude,
                metroCode: response.metro_code
            });
        })
        .then((ipCountry) => {
            return ipCountry;
        });
}

module.exports = {
    createIpRange
};
