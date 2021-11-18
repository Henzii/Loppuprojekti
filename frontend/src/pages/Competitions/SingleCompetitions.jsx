import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardHeader, TableContainer,
  Table, TableHead, TableCell, TableRow, TableBody,
} from '@mui/material';

const SingleCompetition = ({ competition }) => {
  const { course, date, players } = competition;
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardHeader
        title={course.name}
        subheader={`${date} @ ${course.layout}`}
      />
      <CardContent>
        <TableContainer>
          <Table className="kisataulu">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Nimi</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>+/-</TableCell>
                <TableCell>HC</TableCell>
                <TableCell>HC +/-</TableCell>
                <TableCell>HC total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((p) => (
                <TableRow>
                  <TableCell>{p.rank}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.total}</TableCell>
                  <TableCell>{p.plusminus}</TableCell>
                  <TableCell>{p.hc}</TableCell>
                  <TableCell>{p.hcPlusminus}</TableCell>
                  <TableCell>{p.hcTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

SingleCompetition.propTypes = {
  competition: PropTypes.shape().isRequired,
};

export default SingleCompetition;
