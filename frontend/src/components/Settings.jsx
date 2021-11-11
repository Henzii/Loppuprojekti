import {
  Container, Divider, Typography,
} from '@mui/material';
import React from 'react';
import useMe from '../hooks/useMe';
import Aliases from './Aliases';

const Settings = () => {
  const me = useMe();
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Asetukset</Typography>
      <p>
        Tunnus:&nbsp;
        <b>
          {me?.name || 'loading...'}
        </b>
      </p>
      <Divider />
      <Typography variant="h4" gutterBottom>Aliakset</Typography>
      <p>
        Aliakset yhdistävät csv-tiedostossa olevat pelaajat tunnuksiin.
      </p>
      <Aliases />
    </Container>
  );
};

export default Settings;
