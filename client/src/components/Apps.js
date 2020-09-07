import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '@material-ui/core/List';

import AppListItem from './AppListItem';
import parseDynamoData from '../util/parseDynamoData';

const Apps = ({ onClickAppItem }) => {
  const [apps, setApps] = useState([]);
  const handleClick = (app) => {
    onClickAppItem(app);
  };

  useEffect(() => {
    const getAllApps = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/v1/aws/apps'
        );
        console.log(response);
        setApps(parseDynamoData(response.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    getAllApps();
  }, []);

  return (
    <List>
      {apps.map((app) => (
        <div onClick={() => handleClick(app)} key={app.gitUrl}>
          <AppListItem name={app.projectName} />
        </div>
      ))}
    </List>
  );
};

export default Apps;
