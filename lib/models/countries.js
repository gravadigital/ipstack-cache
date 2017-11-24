'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const CountrySchema = new Schema({
    country_code:{
        type:String,
        unique:true
    },
    country_name:String
}, {timestamps:true});
CountrySchema.plugin(findOrCreate);
module.exports = mongoose.model('countries', CountrySchema);
