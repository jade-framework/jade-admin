// const listAllBuckets = async () => {
//   AWS.config.update({ apiVersion: 'latest', region: 'us-west-2' });
//   const s3 = new S3();
//   try {
//     const allBuckets = await s3.listBuckets().promise();
//     console.log(allBuckets);
//   } catch (error) {
//     console.log(error);
//   }
// };
// listAllBuckets();
