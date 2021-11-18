import React from 'react';
import { Container, Divider, Typography } from '@mui/material';
import Typed from 'react-typed';

import { useLoggedIn } from '../../components/LoggedUserProvider';
import LogoutButton from '../../components/LogoutButton';
import CreateAccount from '../../components/CreateAccount';
import LoginForm from '../../components/LoginForm';

const Frontpage = () => {
  const loggedIn = useLoggedIn();
  if (loggedIn) {
    return (
      <Container>
        <Typography variant="h4">
          Tervetuloa
        </Typography>
        <Typography paragraph>
          Olet kirjautunut sisään tunnuksella&nbsp;
          {loggedIn.name}
        </Typography>
        <Typography>
          Eroa välittömästi kerhosta, tai siis&nbsp;
          <LogoutButton />
        </Typography>
      </Container>
    );
  }
  return (
    <Container>
      <Typography variant="h1">
        <Typed
          strings={[
            'fRisbeegolfkerh',
            'Fisbeego',
            'RFisbeegolf',
            'Risbeegomfkerho',
          ]}
          typeSpeed={50}
          backSpeed={40}
          backDelay={10}
          onComplete={(ref) => { ref.cursor.remove(); }}
        />
      </Typography>
      <Typography paragraph>
        Voit kirjautua sisään kirjautumalla sisään tai luoda uuden tunnuksen
        luomalla uuden tunnuksen.
      </Typography>
      <Typography variant="h3">Kirjaudu</Typography>
      <LoginForm />
      <Divider />
      <Typography variant="h3">Luo tunnus</Typography>
      <CreateAccount />
    </Container>
  );
};
export default Frontpage;
