import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AppBuildsTable from './AppBuildsTable';
import parseDynamoData from '../util/parseDynamoData';

const AppBuilds = ({ bucketName }) => {
  const [builds, setBuilds] = useState([]);
  const [region, setRegion] = useState([]);

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

  useEffect(() => {
    const getRegion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/aws/region`,
        );
        setRegion(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRegion();
  }, [bucketName]);

  return (
    <AppBuildsTable builds={builds} region={region} bucketName={bucketName} />
  );
  // return <div>hi</div>;
};

export default AppBuilds;
