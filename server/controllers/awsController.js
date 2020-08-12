// const fs = require('fs');
const { promisify } = require('util');
const AWS = require('aws-sdk/global');
const S3 = require('aws-sdk/clients/s3');
const Dynamo = require('aws-sdk/clients/dynamodb');

const catchAsync = require('../utils/catchAsync');
const { projectTableName } = require('../constants');
// const readFile = promisify(fs.readFile);

exports.getAllApps = catchAsync(async (req, res, next) => {
  // let rawdata = await readFile(`${process.cwd()}/config.json`);
  // let apps = JSON.parse(rawdata);
  // console.log(apps);
  AWS.config.update({ apiVersion: 'latest', region: process.env.REGION });
  const dynamo = new Dynamo();
  const asyncScan = promisify(dynamo.scan.bind(dynamo));
  const response = await asyncScan({ TableName: projectTableName });
  console.log(response);

  res.status(200).json({
    status: 'success',
    count: response.Count,
    data: response.Items,
  });
});
/*
SCAN RESPONSE OBJECT
{
  Items: [
    {
      projectId: [Object],
      gitProvider: [Object],
      cloudFrontOriginId: [Object],
      gitUrl: [Object],
      projectName: [Object],
      bucketName: [Object],
      cloudFrontOriginDomain: [Object]
    }
  ],
  Count: 1,
  ScannedCount: 1
}
*/

exports.getAppBuilds = catchAsync(async (req, res, next) => {
  console.log(req.params.bucketName);
  AWS.config.update({ apiVersion: 'latest', region: process.env.REGION });
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
