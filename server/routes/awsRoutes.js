const express = require('express');

const { getAllApps } = require('../controllers/awsController');

const router = express.Router();

router.get('/apps', getAllApps);

module.exports = router;
