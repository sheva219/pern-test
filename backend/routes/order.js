'use strict';

const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.post('/create', orderController.createOrder);
router.post('/get', orderController.getOrdersByClientId);
router.get('/getAll', orderController.getAllOrders);

module.exports = router;
