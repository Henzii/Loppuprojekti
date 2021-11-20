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
          <Typography variant="h3">Ei turvallinen!?</Typography>
          <Typography paragraph>
            Voit huoletta ottaa foliohatun pois päästä, sillä kaikki &quot;arkaluontoinen&quot; data
            (salasanat, tilastot yms.) kulkevat https-yhteyden kautta.
          </Typography>
          <Typography paragraph>
            Koska sovellus jo toimitettiin Teille salaamattomana, on turha enää siirtyä
            <a href="https://risbeegomfkerho-env.eba-bw33rqyj.us-east-2.elasticbeanstalk.com/">
              &nbsp;salatulle sivulle&nbsp;
            </a>
            , varsinkin kun Risbeegomfkerho on niin köyhä, ettei edes kunnolliseen
            sertifikaattiin ole varaa.
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
