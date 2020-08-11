const express = require('express');

const { getAllApps, getAppBuilds } = require('../controllers/awsController');

const router = express.Router();

router.get('/apps', getAllApps);
router.get('/apps/:bucketName/builds', getAppBuilds);

module.exports = router;
