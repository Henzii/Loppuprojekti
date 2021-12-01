import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useApolloClient, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import { GET_ME, LOGIN } from '../graphql/mutations';

/*
  Palauttaa defaulttina LoginContainerin joka sisältää tapahtumakäsittelijät sekä loginformin
  Alempana pelkkä formi...
*/
export default function LoginContainer() {
  const [loginUser, { loading }] = useMutation(LOGIN);
  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();

  const handleLogin = async (tunnus, salasana) => {
    try {
      const res = await loginUser(
        {
          variables: {
            name: tunnus,
            password: salasana,
          },
        },
      );
      window.scrollTo(0, 0);
      window.sessionStorage.setItem('suklaaJuna', res.data.login);
      await client.refetchQueries({
        include: [GET_ME],
      });
    } catch (error) {
      enqueueSnackbar(`Väärä tunnus tai salasana (${error})`, { variant: 'error' });
    }
  };
  return (
    <LoginForm handleLogin={handleLogin} loading={loading} />
  );
}

export const LoginForm = ({ handleLogin, loading }) => {
  const [tunnus, setTunnus] = useState('');
  const [salasana, setSalasana] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(tunnus, salasana);
    setTunnus('');
    setSalasana('');
  };
  return (
    <div style={{ margin: '8px 0px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container columns={1} spacing={1}>
          <Grid item xs={1}>
            <TextField name="tunnus" placeholder="Tunnus..." value={tunnus} onChange={(e) => setTunnus(e.target.value)} />
          </Grid>
          <Grid item xs={1}>
            <TextField name="password" type="password" value={salasana} onChange={(e) => setSalasana(e.target.value)} placeholder="Salasana..." />
          </Grid>
          <Grid item xs={1}>
            <LoadingButton loading={loading} type="submit" size="large">Kirjaudu</LoadingButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
LoginForm.defaultProps = {
  loading: false,
};
