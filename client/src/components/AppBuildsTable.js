import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

/*
@TODOS
- Add link to commit history (Default to master branch)
- Update table fields & add timestamp (versionId)
*/

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const AppBuildsTable = ({ builds, region, bucketName }) => {
  const rows = builds.map((build) => {
    const dateMili = parseInt(build.versionId, 10);
    const dateObj = new Date(dateMili);
    // const date = dateObj.toDateString();
    const date = dateObj.toString();
    const githubCommitUrl = build.commitUrl || build.gitUrl;
    const buildUrl = `https://${bucketName}-builds.s3-${region}.amazonaws.com/${build.versionId}.zip`;
    return (
      <TableRow key={build.projectId}>
        <TableCell>{date}</TableCell>
        <TableCell>
          <Link color="primary" href={githubCommitUrl} target="_blank">
            {githubCommitUrl}
          </Link>
        </TableCell>
        <TableCell>
          <Link color="primary" href={buildUrl} target="_blank">
            Download
          </Link>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <Title>Build History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Repository</TableCell>
            <TableCell>Build Files</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See previous builds
        </Link>
      </div> */}
    </>
  );
};

export default AppBuildsTable;
