'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IpZoneSchema = new Schema({
    ipRange: String,
    countryCode: String,
    countryName: String,
    regionCode: String,
    regionName: String,
    city: String,
    zipCode: String,
    timeZone: String,
    latitude: Number,
    longitude: Number,
    metroCode: Number
}, {
    timestamps:true
});

module.exports = mongoose.model('IpZone', IpZoneSchema);
