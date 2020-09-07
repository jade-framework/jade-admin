import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AppInfoTable from './AppInfoTable';

const AppInfo = ({ app }) => {
  return <AppInfoTable app={app} />;
};

export default AppInfo;
