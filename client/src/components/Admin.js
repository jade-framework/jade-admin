import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getAllApps = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/v1/aws/apps'
        );
        setApps(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllApps();
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
  }, []);

  return (
    <div>
      <h1>Jade Admin Panel</h1>
      <ul>
        {apps.map((app) => (
          <li key={app.gitUrl}>
            {app.projectName} | {app.gitUrl}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
