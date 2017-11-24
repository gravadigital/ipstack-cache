'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Countries = require('./countries');
const findOrCreate = require('mongoose-findorcreate');
const ipCountrySchema = new Schema({
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

ipCountrySchema.pre('save', function(next) {
    Countries.findOrCreate({country_code:this.country_code, country_name: this.country_name})
        .then(() => {
            next();
        });
});
ipCountrySchema.plugin(findOrCreate);
module.exports = mongoose.model('ipcountries', ipCountrySchema);
