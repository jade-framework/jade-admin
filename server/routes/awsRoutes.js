const express = require('express');

const {
  getAllApps,
  getAppBuilds,
  getAwsRegion,
} = require('../controllers/awsController');

const router = express.Router();

router.get('/apps', getAllApps);
router.get('/apps/:bucketName/builds', getAppBuilds);
router.get('/region', getAwsRegion);

module.exports = router;
