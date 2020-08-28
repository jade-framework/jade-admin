import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AppBuildsTable from './AppBuildsTable';
import parseDynamoData from '../util/parseDynamoData';

const AppBuilds = ({ bucketName }) => {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const getAppBuilds = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/aws/apps/${bucketName}/builds`,
        );
        setBuilds(parseDynamoData(response.data.data.Items));
      } catch (error) {
        console.log(error);
      }
    };
    getAppBuilds();
  }, [bucketName]);

  return <AppBuildsTable builds={builds} />;
  // return <div>hi</div>;
};

export default AppBuilds;
