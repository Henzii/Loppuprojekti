import React, { useState } from 'react';
import {
  Button,
  Collapse,
  Container, Typography,
} from '@mui/material';
import useGetCompetitions from '../../hooks/useGetCompetitions';
import SingleCompetition from './SingleCompetitions';
import LoadingPage from '../../components/LoadingPage';
import PointList from './PointsList';

const Competitions = () => {
  const competitions = useGetCompetitions();
  const [showPoints, setShowPoints] = useState(false);
  if (!competitions) {
    return <LoadingPage />;
  }
  if (competitions.length < 1) {
    return (
      <Typography paragraph>
        Ei yhtään kilpailua? Erotkaa ryhmästä välittömästi!
      </Typography>
    );
  }
  return (
    <Container>
      <Typography variant="h2">Kilpailut</Typography>
      <Button onClick={() => setShowPoints((open) => !open)}>
        {(showPoints) ? 'Piilota pisteet' : 'Näytä pisteet'}
      </Button>
      <Collapse in={showPoints}>
        <PointList competitions={competitions} />
      </Collapse>
      {competitions.map((c) => <SingleCompetition competition={c} key={c.gameId} />)}
    </Container>
  );
};

export default Competitions;
