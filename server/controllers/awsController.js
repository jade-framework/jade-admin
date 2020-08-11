const fs = require('fs');
const util = require('util');

const catchAsync = require('../utils/catchAsync');
const readFile = util.promisify(fs.readFile);

exports.getAllApps = catchAsync(async (req, res, next) => {
  let rawdata = await readFile(`${process.cwd()}/config.json`);
  let apps = JSON.parse(rawdata);
  console.log(apps);

  res.status(200).json({
    status: 'success',
    data: apps,
  });
});
