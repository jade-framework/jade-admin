import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <ul>
        {builds.map((build) => (
          <li key="1">Build here</li>
        ))}
      </ul>
    </div>
  );
};

export default AppBuilds;
