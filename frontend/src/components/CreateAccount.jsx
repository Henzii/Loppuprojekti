import {
  TextField, Typography, Button, Grid, Backdrop, CircularProgress,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { CREATE_USER } from '../graphql/mutations';

function CreateAccount() {
  const [createUser, createUserData] = useMutation(CREATE_USER);
  const { enqueueSnackbar } = useSnackbar();
  const [tunnukset, setTunnukset] = useState({
    tunnus: '',
    password: '',
    password2: '',
    email: '',
    valid: false,
  });

  const handleFieldChange = (e) => {
    const newTunnus = { ...tunnukset, [e.target.name]: e.target.value };
    newTunnus.valid = (newTunnus.tunnus !== '' && newTunnus.password !== '' && newTunnus.password === newTunnus.password2);
    setTunnukset(newTunnus);
  };
  const handleCreation = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          name: tunnukset.tunnus,
          password: tunnukset.password,
          email: tunnukset.email,
        },
      });
      enqueueSnackbar('Tunnus luotiin onnistuneesti!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Virhe tunnuksen luomisessa!', { variant: 'error' });
    }
  };

  if (createUserData.loading) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }
  if (createUserData.data?.addUser.id) {
    return (
      <>
        <Typography variant="h4">Tunnus luotu</Typography>
        <Typography paragraph>
          Tunnus luotiin onnistuneesti! Voit kirjautua sillä sisään jahka se ensin aktivoidaan.
        </Typography>
      </>
    );
  }
  return (
    <>
      {
        (createUserData.error
          && (
            <div className="div-error">
              Virhe tunnuksen luomisessa! (
              {createUserData.error.message}
              )
            </div>
          )
        )
      }
      <form onSubmit={handleCreation}>
        <Grid container spacing={1} alignItems="center" columns={5}>
          <Grid item md={1} xs={3}>Tunnus:</Grid>
          <Grid item md={4} xs={3}>
            <TextField name="tunnus" style={{ minWidth: '50%' }} required onChange={handleFieldChange} />
          </Grid>
          <Grid item md={1} xs={3}>Salasana:</Grid>
          <Grid item md={4} xs={3}><TextField style={{ minWidth: '50%' }} name="password" required type="password" onChange={handleFieldChange} /></Grid>
          <Grid item md={1} xs={3}>Vahvista salasana:</Grid>
          <Grid item md={4} xs={3}><TextField style={{ minWidth: '50%' }} name="password2" required type="password" onChange={handleFieldChange} /></Grid>
          <Grid item md={1} xs={3}>Email:</Grid>
          <Grid item md={4} xs={3}><TextField style={{ minWidth: '50%' }} name="email" placeholder="Iimeil" onChange={handleFieldChange} /></Grid>
          <Grid item md={5} xs={3}>
            <Button size="large" variant="contained" disabled={!tunnukset.valid} type="submit">
              Luo tunnukset
            </Button>
          </Grid>
        </Grid>

      </form>
    </>
  );
}
export default CreateAccount;
