'use strict';
const express = require('express');
const login = require('./login');
const dashboard = require('./dashboard');

const router = express.Router();

router.use('/', login);
router.use('/dashboard', dashboard);

module.exports = router;