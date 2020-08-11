import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';

import AppBuildItem from './AppListItem';

const AppBuilds = () => {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const getAppBuilds = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/v1/aws/apps/123/builds'
        );
        setBuilds(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAppBuilds();
  }, []);

  return (
    <List>
      {builds.map((build) => (
        <AppBuildItem key="1" name="name goes here" />
      ))}
    </List>
  );
};

export default AppBuilds;
