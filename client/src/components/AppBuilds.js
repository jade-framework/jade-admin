import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AppBuildsTable from './AppBuildsTable';

const AppBuilds = ({ bucketName }) => {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const getAppBuilds = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/aws/apps/${bucketName}/builds`
        );
        setBuilds(response.data.data.Contents);
      } catch (error) {
        console.log(error);
      }
    };
    getAppBuilds();
  }, []);

  return <AppBuildsTable builds={builds} />;
};

export default AppBuilds;
