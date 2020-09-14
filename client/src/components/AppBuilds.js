import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AppBuildsTable from './AppBuildsTable';
import parseDynamoData from '../util/parseDynamoData';

const AppBuilds = ({ bucketName, region }) => {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const getAppBuilds = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/aws/apps/${bucketName}/builds`,
        );
        const parsedBuilds = parseDynamoData(response.data.data.Items);
        const sortedBuilds = parsedBuilds.sort((a, b) => {
          return b.versionId - a.versionId;
        });
        setBuilds(sortedBuilds);
      } catch (error) {
        console.log(error);
      }
    };
    getAppBuilds();
  }, [bucketName]);

  return (
    <AppBuildsTable builds={builds} region={region} bucketName={bucketName} />
  );
};

export default AppBuilds;
