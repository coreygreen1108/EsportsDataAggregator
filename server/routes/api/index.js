'use strict';

let router = require('express').Router();

module.exports = router;

router.use('/smite', require('./smite'));
router.use('/admin', require('./admin'));
