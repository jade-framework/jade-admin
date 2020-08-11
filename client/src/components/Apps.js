import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '@material-ui/core/List';

import AppListItem from './AppListItem';

const Apps = () => {
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
  }, []);

  return (
    <List>
      {apps.map((app) => (
        <AppListItem key={app.gitUrl} name={app.projectName} />
      ))}
    </List>
  );
};

export default Apps;
