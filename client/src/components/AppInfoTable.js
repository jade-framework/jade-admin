import React from 'react';
import axios from 'axios';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import { List, ListItem, ListItemText, Tooltip } from '@material-ui/core';

/*
@TODOS
- activeVersion from dynamo (same as versionId in builds table)
*/

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const AppInfoTable = ({ app }) => {
  const classes = useStyles();

  return (
    <>
      <Title>Project Info</Title>
      <List>
        <ListItem>
          <ListItemText>{app.projectName}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Link
              target="_blank"
              color="primary"
              href={`http://${app.cloudFrontDomainName}`}
            >
              View live site
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Link
              target="_blank"
              color="primary"
              href={`http://${app.bucketName}-stage.s3-website.us-west-2.amazonaws.com`}
            >
              View staged site
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem>
          <Tooltip
            title="Add this to your Github settings"
            placement="bottom-start"
          >
            <ListItemText>
              Webhook Address: {`http://${app.publicIp}/webhook`}
            </ListItemText>
          </Tooltip>
        </ListItem>
      </List>
    </>
  );
};

export default AppInfoTable;
