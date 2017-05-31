'use strict';

const router = require('express').Router();
let smiteAPIMethods = require('../../../utils/smiteAPIDefaultMethodData');

module.exports = router;

router.get('/apiRequests', (req, res, next) => {
  res.json(smiteAPIMethods);
});

