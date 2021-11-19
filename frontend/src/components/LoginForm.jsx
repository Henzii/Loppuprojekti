import React from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useApolloClient, useMutation } from '@apollo/client';
import { GET_ME, LOGIN } from '../graphql/mutations';

function LoginForm() {
  const [loginUser, { loading }] = useMutation(LOGIN);
  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(
        {
          variables: {
            name: e.target.tunnus.value,
            password: e.target.password.value,
          },
        },
      );
      window.scrollTo(0, 0);
      document.cookie = `suklaaKeksi=${res.data.login}`;
      await client.refetchQueries({
        include: [GET_ME],
      });
    } catch (error) {
      enqueueSnackbar('Väärä tunnus tai salasana!', { variant: 'error' });
    } finally {
      e.target.tunnus.value = '';
      e.target.password.value = '';
    }
  };

  return (
    <div style={{ margin: '8px 0px' }}>
      <form onSubmit={handleLogin}>
        <Grid container columns={1} spacing={1}>
          <Grid item xs={1}>
            <TextField name="tunnus" placeholder="Tunnus..." />
          </Grid>
          <Grid item xs={1}>
            <TextField name="password" type="password" variant="outlined" placeholder="Salasana..." />
          </Grid>
          <Grid item xs={1}>
            <LoadingButton loading={loading} type="submit" size="large"> Kirjaudu</LoadingButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
export default LoginForm;
