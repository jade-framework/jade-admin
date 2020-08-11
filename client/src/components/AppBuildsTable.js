import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const AppBuildsTable = ({ builds }) => {
  const classes = useStyles();
  const rows = builds.map((build) => {
    const dateMili = parseInt(build.Key.replace('/.zip', ''), 10);
    const dateObj = new Date(dateMili);
    const date = dateObj.toDateString();
    return (
      <TableRow key={build.Key}>
        <TableCell>{date}</TableCell>
        <TableCell>{build.ETag}</TableCell>
        <TableCell align="right">Enabled</TableCell>
      </TableRow>
    );
  });

  return (
    <React.Fragment>
      <Title>Build History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Etag</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See previous builds
        </Link>
      </div>
    </React.Fragment>
  );
};

export default AppBuildsTable;
