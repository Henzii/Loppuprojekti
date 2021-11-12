import React from 'react';
import { Container } from '@mui/material';
import useGetCompetitions from '../hooks/useGetCompetitions';

const Competitions = () => {
  const competitions = useGetCompetitions();
  console.log(competitions);
  return (
    <Container>
      <h1>Kisat</h1>
    </Container>
  );
};

export default Competitions;
