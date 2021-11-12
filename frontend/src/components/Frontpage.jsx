import React from 'react';
import { Container, Divider, Typography } from '@mui/material';

import { useLoggedIn } from './LoggedUserProvider';
import LogoutButton from './LogoutButton';
import CreateAccount from './CreateAccount';
import LoginForm from './LoginForm';

const Frontpage = () => {
  const me = useLoggedIn();
  if (me) {
    return (
      <Container>
        Kirjautunut&nbsp;
        <b>
          {me.name}
        </b>
        <LogoutButton />
      </Container>
    );
  }
  return (
    <Container>
      <Typography gutterBottom variant="h2">Tervetuloa</Typography>
      <Typography>
        Voit kirjautua sisään kirjautumalla sisään tai luoda uuden tunnuksen
        luomalla uuden tunnuksen.
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
