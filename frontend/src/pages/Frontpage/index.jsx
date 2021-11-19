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
          Omistatko jo tunnukset?&nbsp;
          <a href="#login">Kirjaudu sisään!</a>
        </Typography>
      </div>
      <div className="wideContainer splitContainer" id="login">
        <div className="darkContainer">
          <Typography paragraph style={{ margin: '20% 30%' }}>
            <i>
              &quot;Hauki on kala!&quot;
            </i>
            <br />
            &nbsp; - Antti S.
          </Typography>
        </div>
        <div>
          <Typography variant="h3">Kirjaudu sisään</Typography>
          <Typography paragraph>
            Syötä tunnuksesi ja salasanasi alla oleviin kenttiin kirjautuaksesi sisään.
          </Typography>
          <LoginForm />
        </div>
      </div>
      <div className="wideContainer">
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
