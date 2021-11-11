import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@mui/material';
import convertUTCDateToLocalDate from '../utils/dateAndTine';

const SingleLogEntry = ({ log }) => {
  const {
    date, process, type, message,
  } = log;
  const paivays = convertUTCDateToLocalDate(new Date(+date));
  return (
    <TableRow>
      <TableCell>{paivays.toLocaleString()}</TableCell>
      <TableCell>{process}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{message}</TableCell>
    </TableRow>
  );
};

SingleLogEntry.propTypes = {
  log: PropTypes.shape({
    date: PropTypes.string.isRequired,
    process: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
export default SingleLogEntry;
