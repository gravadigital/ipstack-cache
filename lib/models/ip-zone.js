'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IpZoneSchema = new Schema({
    ipRange: String,
    country_code: String,
    country_name: String,
    region_code: String,
    region_name: String,
    city: String,
    zip_code: String,
    time_zone: String,
    latitude: Number,
    longitude: Number,
    metro_code: Number
}, {
    timestamps:true
});

module.exports = mongoose.model('IpZone', IpZoneSchema);
