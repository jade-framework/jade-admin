// const fs = require('fs');
const { promisify } = require('util');
const AWS = require('aws-sdk/global');
const Dynamo = require('aws-sdk/clients/dynamodb');

const catchAsync = require('../utils/catchAsync');
const {
  projectsTableName,
  projectsVersionsTableName,
} = require('../constants');

exports.getAllApps = catchAsync(async (req, res, next) => {
  AWS.config.update({ apiVersion: 'latest', region: process.env.REGION });
  const dynamo = new Dynamo();
  const asyncScan = promisify(dynamo.scan.bind(dynamo));
  const response = await asyncScan({ TableName: projectsTableName });
  console.log(response);

  res.status(200).json({
    status: 'success',
    count: response.Count,
    data: response.Items,
  });
});

exports.getAppBuilds = catchAsync(async (req, res, next) => {
  AWS.config.update({ apiVersion: 'latest', region: process.env.REGION });
  const bucketName = req.params.bucketName;
  const dynamo = new Dynamo();
  const asyncScan = promisify(dynamo.scan.bind(dynamo));
  const response = await asyncScan({
    TableName: projectsVersionsTableName,
    ExpressionAttributeValues: {
      ':bucket': {
        S: bucketName,
      },
    },
    FilterExpression: `bucketName = :bucket`,
  });
  const builds = response;
  console.log(builds);

  res.status(200).json({
    status: 'success',
    data: builds,
  });
});

/*
// const readFile = promisify(fs.readFile);
  // let rawdata = await readFile(`${process.cwd()}/config.json`);
  // let apps = JSON.parse(rawdata);
  // console.log(apps);
*/
