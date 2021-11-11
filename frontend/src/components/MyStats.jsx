import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Backdrop, CircularProgress, Container, Typography,
} from '@mui/material';
import { GET_SIMPLE_COURSE_STATS } from '../graphql/mutations';
import SimpleCourseStats from './SimpleCourseStats';

const MyStats = () => {
  const rataData = useQuery(GET_SIMPLE_COURSE_STATS);
  if (rataData.loading) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }
  if (!rataData.data) {
    return (
      <div className="div-error">
        Ei dataa, olethan kirjautunut?
      </div>
    );
  }
  return (
    <Container>
      <Typography variant="h3">Ratadataa</Typography>
      {rataData.data.getCourseStats.map((s) => (
        <SimpleCourseStats key={s.rata + s.layout} data={s} />
      ))}
    </Container>
  );
};

export default MyStats;
