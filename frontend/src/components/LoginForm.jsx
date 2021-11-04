import React from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

function LoginForm() {
  const [loginUser, { loading }] = useMutation(LOGIN);

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
      console.log('Login res: ', res.data.login);
      document.cookie = `suklaaKeksi=${res.data.login}`;
      e.target.tunnus.value = '';
      e.target.password.value = '';
    } catch (error) {
      console.log(`VIrhe sisäänkirjautumisessa (${error.message})`);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <TextField name="tunnus" placeholder="Tunnus..." />
        <TextField name="password" type="password" variant="outlined" placeholder="Salasana..." />
        <LoadingButton loading={loading} type="submit"> Kirjaudu</LoadingButton>
      </form>
    </>
  );
}
export default LoginForm;
