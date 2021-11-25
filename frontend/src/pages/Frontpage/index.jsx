import React from 'react';
import { Typography } from '@mui/material';
import Typed from 'react-typed';

import { useLoggedIn } from '../../components/LoggedUserProvider';
import CreateAccount from '../../components/CreateAccount';
import LoginForm from '../../components/LoginForm';
import LoggedFrontPage from './LoggedFrontPage';

const Frontpage = () => {
  const loggedIn = useLoggedIn();
  if (loggedIn.me) {
    return (
      <LoggedFrontPage />
    );
  }
  return (
    <>
      <div className="wideContainer wideContainerTop">
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
          Olet eksynyt Risbeegomfkerhon sivuille.
        </Typography>
        <Typography paragraph>
          Voit&nbsp;
          <a href="#login">kirjautua sisään</a>
          &nbsp;tai&nbsp;
          <a href="#luoTunnus">luoda tunnukset</a>
          .
        </Typography>
      </div>
      <div className="wideContainer splitContainer">
        <div className="darkContainer">
          <Typography paragraph align="center">
            <i>&quot;Hauki on kala&quot;</i>
          </Typography>
        </div>
        <div id="login">
          <Typography variant="h3">Kirjaudu sisään</Typography>
          <Typography paragraph>
            Syötä tunnuksesi ja salasanasi alla oleviin kenttiin kirjautuaksesi sisään.
          </Typography>
          <LoginForm />
        </div>
      </div>
      <div className="wideContainer" id="luoTunnus">
        <Typography variant="h3">Luo tunnuket</Typography>
        <Typography paragraph>
          Luo tunnukset täyttämällä alla oleva lomake. Sähköpostiosoite ei ole pakollinen.
        </Typography>
        <Typography paragraph>
          Tunnukset eivät ole käytettävissä heti luomisen jälkeen, vaan jonkun täytyy
          aktivoida ne ensin.
        </Typography>
        <CreateAccount />
      </div>

    </>
  );
};
export default Frontpage;
