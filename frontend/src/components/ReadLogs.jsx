/* eslint-disable react/no-array-index-key */
import { useQuery } from '@apollo/client';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { GET_LOGS } from '../graphql/mutations';
import SingleLogEntry from './SingleLogEntry';

const ReadLogs = () => {
  const logsData = useQuery(GET_LOGS);
  const [logit, setLogit] = useState(null);

  useEffect(() => {
    if (logsData.data && !logsData.loading) {
      setLogit(logsData.data.getLogs);
    }
  }, [logsData]);

  if (!logit) return (<h1>Loading...</h1>);
  return (
    <Container>
      <Typography variant="h3">Captain&apos;s log</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Päivä</TableCell>
              <TableCell>Prosessi</TableCell>
              <TableCell>Tyyppi</TableCell>
              <TableCell>Viesti</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logit.map((l, i) => <SingleLogEntry key={l.date + i} log={l} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default ReadLogs;
