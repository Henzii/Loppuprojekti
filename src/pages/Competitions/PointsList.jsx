/* eslint-disable no-multi-assign */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import {
  Table, TableHead, TableBody, TableCell, TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';

const PointsList = ({ competitions }) => {
  const [pisteTaulu, setPistetaulu] = useState([]);

  useEffect(() => {
    const taulu = competitions.reduce((p, c) => {
      const ret = p;
      c.players.forEach((element) => {
        ret[element.name] = ret[element.name] + element.points || element.points;
      });
      return ret;
    }, []);
    setPistetaulu(taulu.sort((a, b) => taulu[b] - taulu[a]));
  }, []);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nimi</TableCell>
          <TableCell>Pisteet</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(pisteTaulu)
          .map((key) => (
            <TableRow>
              <TableCell>{key}</TableCell>
              <TableCell>{pisteTaulu[key]}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

PointsList.propTypes = {
  competitions: PropTypes.array.isRequired,
};

export default PointsList;
