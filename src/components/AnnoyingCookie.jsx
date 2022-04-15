import { Button } from '@mui/material';
import { createStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';

export default function AnnoyingCookie() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);
  const tyyli = createStyles({
    main: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      top: 0,
      left: 0,
      zIndex: 10000,
      backgroundColor: 'rgba(0,0,0,0.5)',
      transition: 3,
      padding: '0px 20%',
    },
    boksi: {
      height: '100%',
    },
  });
  if (!show) {
    return null;
  }
  return (
    <div style={tyyli.main}>
      <div>
        <h1>Evästeet</h1>
      </div>
      <div>
        Tämä sivusto ei käytä evästeitä. Hyväksy eväisteiden käyttämättömyys valitsemalla
        &apos;Hyväksy&apos;. Jos et hyväksy evästeitä, valitse &apos;Hylkää&apos;
        jolloin eväisteitä ei käytetä.
      </div>
      <div>
        <Button onClick={() => setShow(false)}>Hyväksy</Button>
        &nbsp;
        <Button onClick={() => setShow(false)}>Hylkää</Button>
      </div>
    </div>
  );
}
