'use strict';

const express = require('express');
const router = express.Router();
const clientRouter = require('./client');
const orderRouter = require('./order');

router.use('/clients', clientRouter);
router.use('/orders', orderRouter);

module.exports = router;
