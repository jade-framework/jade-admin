import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Data
function createData(id, date, status, other) {
  return { id, date, status, other };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Enabled', 'abc'),
  createData(1, '16 Mar, 2019', 'Disabled', 'def'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const AppBuildsTable = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Build History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Something</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{row.other}</TableCell>
            </TableRow>
          ))}
        </TableBody>
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
