import {
  Button,
  Container, Divider, Grid, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { useSnackbar } from 'notistack';
import useMe from '../../hooks/useMe';
import Aliases from '../../components/Aliases';
import HideIfNotLogged from '../../components/HideIfNotLogged';
import AdminSetup from './AdminSettings';
import LoadingPage from '../../components/LoadingPage';

const Settings = () => {
  const { me, update } = useMe(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleEmailChange = (e) => {
    e.preventDefault();
    update({ email: e.target.email.value }).then(() => {
      enqueueSnackbar('Sähköposti vaihdettu!', { variant: 'success' });
    }).catch((err) => {
      enqueueSnackbar(`Virhe sähköpostia vaihtaessa! (${err})`, { variant: 'error' });
    });
    e.target.email.value = '';
  };
  const handlePassWordChange = (e) => {
    e.preventDefault();
    const { salasana1, salasana2 } = e.target;
    if (salasana1.value !== salasana2.value) {
      enqueueSnackbar('Salasanat eivät täsmää!', { variant: 'error' });
    } else {
      update({ password: salasana1.value }).then(() => {
        enqueueSnackbar('Salasana vaihdettu', { variant: 'info' });
      }).catch(() => {
        enqueueSnackbar('Virhe salasanaa vaihtaessa!', { variant: 'error' });
      });
    }
    salasana1.value = '';
    salasana2.value = '';
  };
  if (!me) {
    return <LoadingPage />;
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
        <TextField name="email" label="Uusi sähköpostiosoite" />
        &nbsp;
        <Button variant="contained" type="submit">Vaihda</Button>
      </form>
      <Divider />
      <form onSubmit={handlePassWordChange}>
        <Typography variant="h4" gutterBottom>Vaihda salasana</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField name="salasana1" type="password" label="Uusi salasana" />
          </Grid>
          <Grid item xs={12}>
            <TextField name="salasana2" type="password" label="Vahvista salasana" />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">Vaihda</Button>
          </Grid>
        </Grid>
      </form>
      <Divider />
      <Typography variant="h4" gutterBottom>Aliakset</Typography>
      <Typography paragraph>
        Aliakset yhdistävät csv-tiedostossa olevat pelaajat tunnuksiin.
      </Typography>
      <Aliases />
      <Divider />
      <HideIfNotLogged rooli="admin">
        <AdminSetup />
      </HideIfNotLogged>
    </Container>
  );
};

export default Settings;
