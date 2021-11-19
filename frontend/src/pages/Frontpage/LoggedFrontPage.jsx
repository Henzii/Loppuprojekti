import {
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLoggedIn } from '../../components/LoggedUserProvider';
import LogoutButton from '../../components/LogoutButton';

const LoggedFrontPage = () => {
  const loggedMe = useLoggedIn();

  return (
    <>
      <div className="wideContainer wideContainerTop">
        <Typography variant="h2">
          Olet kirjautunut sisään
        </Typography>
        <Typography paragraph>
          Olet kirjautunut sisään tunnuksella&nbsp;
          <b>
            {loggedMe?.me.name}
          </b>
        </Typography>
        <Typography paragraph>
          Jos haluat kirjautua ulos, voit erota välittömästi ryhmästä klikkaamalla&nbsp;
          <LogoutButton />
          &nbsp;-nappia
        </Typography>
      </div>
      <div className="wideContainer splitContainer">
        <div className="darkContainer">
          <Typography variant="h2">Aliakset</Typography>
          <Typography paragraph>
            Aliaskset yhdistävät Udiscin csv-tiedoston nimet käyttäjätunnuksiin. Aliaksia voi
            lisätä&nbsp;
            <Link to="/settings">asetuksissa</Link>
          </Typography>
        </div>
        <div>
          &nbsp;
        </div>
      </div>
      <div className="wideContainer splitContainer">
        <div>
          &nbsp;
        </div>
        <div className="darkContainer">
          <Typography variant="h2">CSV-tiedosto</Typography>
          <Typography paragraph>
            Udiscistä saatavan csv-tiedoston voi lähettää&nbsp;
            <Link to="/upload">Upload</Link>
            &nbsp; -sivun kautta!
          </Typography>
        </div>
      </div>
    </>
  );
};

export default LoggedFrontPage;
