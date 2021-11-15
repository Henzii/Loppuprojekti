import {
  Backdrop,
  CircularProgress, Button,
  Container, Divider, Grid, TextField, Typography,
} from '@mui/material';
import React from 'react';
import useMe from '../hooks/useMe';
import Aliases from './Aliases';

const Settings = () => {
  const { me } = useMe(true);
  const handleEmailChange = (e) => {
    e.preventDefault();
    e.target.email.value = '';
  };
  if (!me) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Asetukset</Typography>
      <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ width: { xs: '100%', md: '50%' } }}>
        <Grid item xs={6}>Tunnus</Grid>
        <Grid item xs={6}>{me.name}</Grid>
        <Grid item xs={6}>Sähköposti</Grid>
        <Grid item xs={6}>{me.email || 'Ei asetettu'}</Grid>
      </Grid>
      <Divider />
      <Typography variant="h4" gutterBottom>Vaihda email</Typography>
      <form onSubmit={handleEmailChange}>
        <TextField name="email" placeholder="Uusi email" size="small" />
        &nbsp;
        <Button variant="contained" type="submit">Vaihda</Button>
      </form>
      <Divider />
      <form>
        <Typography variant="h4" gutterBottom>Vaihda salasana</Typography>
        <TextField name="salasana1" type="password" />
        <br />
        <TextField name="salasana2" type="password" />
        <br />
        <Button type="submit" variant="contained">Vaihda</Button>
      </form>
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
