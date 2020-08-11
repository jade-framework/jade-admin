import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <ul>
        {apps.map((app) => (
          <li key={app.gitUrl}>{app.projectName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Apps;
