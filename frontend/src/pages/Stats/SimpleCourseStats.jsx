import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardHeader, Collapse, IconButton, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

const colorMaker = (par, score) => {
  const diff = score - par;
  if (diff > 5) return 'red';
  if (diff <= 0) return 'green';
  return 'orange';
};
const addPlus = (number) => {
  if (number >= 0) return `+${number}`;
  return number;
};
const useStyles = makeStyles({
  latest: {
    color: ({ par, latest }) => colorMaker(par, latest),
  },
  best: {
    color: ({ par, best }) => colorMaker(par, best),
  },
  avg: {
    color: ({ par, avg }) => colorMaker(par, avg),
  },
});

const SimpleCourseStats = ({ data }) => {
  const tyylit = useStyles({
    par: data.par, latest: data.latest, best: data.min, avg: data.avg,
  });
  const [showMore, setShowMore] = useState(false);

  return (
    <Card style={{ marginBottom: '15px' }}>
      <CardHeader
        title={data.rata}
        subheader={data.layout}
        action={
          (
            <IconButton onClick={() => setShowMore(!showMore)}>
              <ExpandMoreIcon fontSize="large" />
            </IconButton>
          )
        }
      />
      <CardContent>
        <TableContainer>
          <Table className="stats-table">
            <TableHead>
              <TableRow>
                <TableCell>Radan par</TableCell>
                <TableCell>Pelattuja pelejä</TableCell>
                <TableCell>KA</TableCell>
                <TableCell>Paras</TableCell>
                <TableCell>HC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{data.par}</TableCell>
                <TableCell>{data.games}</TableCell>
                <TableCell className={tyylit.avg}>
                  {
                    addPlus(Math.round((data.avg - data.par) * 10) / 10)
                  }
                </TableCell>
                <TableCell className={tyylit.best}>
                  {addPlus(data.min - data.par)}
                </TableCell>
                <TableCell>
                  {data.hc}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Collapse in={showMore} mountOnEnter={false}>
          <Typography variant="h5">10 viimeisintä kierrosta</Typography>
          {data.tenLatestRounds.map((r, i) => {
            const key = `${data.rata}${data.layout}${i}`;
            return (<span className="largeFont" key={key} style={{ marginRight: '5%' }}>{r - data.par}</span>);
          })}
        </Collapse>
      </CardContent>
    </Card>
  );
};
SimpleCourseStats.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default SimpleCourseStats;
