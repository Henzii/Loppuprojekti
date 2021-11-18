import React from 'react';
import {
  Container, Typography,
} from '@mui/material';
import useGetCompetitions from '../../hooks/useGetCompetitions';
import SingleCompetition from './SingleCompetitions';
import LoadingPage from '../../components/LoadingPage';

const Competitions = () => {
  const competitions = useGetCompetitions();
  if (!competitions) {
    return <LoadingPage />;
  }
  return (
    <Container>
      <Typography variant="h3">Kilpailut</Typography>
      {competitions.map((c) => <SingleCompetition competition={c} key={c.gameId} />)}
    </Container>
  );
};

export default Competitions;
