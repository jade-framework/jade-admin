const fs = require('fs');
const { promisify } = require('util');
const AWS = require('aws-sdk/global');
const S3 = require('aws-sdk/clients/s3');

const catchAsync = require('../utils/catchAsync');
const readFile = promisify(fs.readFile);

exports.getAllApps = catchAsync(async (req, res, next) => {
  let rawdata = await readFile(`${process.cwd()}/config.json`);
  let apps = JSON.parse(rawdata);
  console.log(apps);

  res.status(200).json({
    status: 'success',
    data: apps,
  });
});

exports.getAppBuilds = catchAsync(async (req, res, next) => {
  console.log(req.params.bucketName);
  AWS.config.update({ apiVersion: 'latest', region: 'us-west-2' });
  const s3 = new S3();
  const asyncListObjects = promisify(s3.listObjects.bind(s3));
  const builds = await asyncListObjects({
    Bucket: `${req.params.bucketName}-builds`,
  });
  console.log(builds);

  res.status(200).json({
    status: 'success',
    data: builds,
  });
});
