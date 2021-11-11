import React from 'react';
import { Container, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLoggedIn } from './LoggedUserProvider';
import LogoutButton from './LogoutButton';
import CreateAccount from './CreateAccount';
import LoginForm from './LoginForm';
import Aliases from './Aliases';

const Frontpage = () => {
  const me = useLoggedIn();
  if (me) {
    return (
      <Container>
        <Link to="/logs">Lokikirja</Link>
        <br />
        <LogoutButton />
        <Aliases />
      </Container>
    );
  }
  return (
    <Container>
      <Typography gutterBottom variant="h2">Tervetuloa</Typography>
      <Typography>
        Kirjaudu joko sisään tai luo uusi tunnus.
      </Typography>
      <Typography variant="h4">Kirjaudu</Typography>
      <LoginForm />
      <Divider />
      <Typography variant="h4">Luo tunnus</Typography>
      <CreateAccount />
    </Container>
  );
};
export default Frontpage;
