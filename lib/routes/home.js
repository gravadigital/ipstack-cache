'use strict';
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.json({
        monkey: 'A little monkey'
    });
});

module.exports = router;
