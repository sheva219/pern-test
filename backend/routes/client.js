'use state';

const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController');

router.post('/create', clientController.createClient);
router.get('/getAll', clientController.getAllClient);

module.exports = router;
