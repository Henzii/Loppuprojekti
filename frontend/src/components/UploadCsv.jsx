import React from 'react';
import {
  Button, Container, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const UploadCsv = () => {
  const handleUpload = () => {
  };
  return (
    <Container>
      <Typography variant="h3">CSV-tiedoston lähetys</Typography>
      <p>
        Valitse UDiscistä saatava csv-tiedosto ja paina lähetä-nappia
      </p>
      <p>
        Kun tiedosto on lähetetty, parsii palvelin sitä kasaan ja tunkee sen sittne tietokantaan.
        Etenemistä voi seurata&nbsp;
        <Link to="/logs">kapteenin lokista</Link>
        .
      </p>
      <form>
        <input
          type="file"
          id="raised-button-file"
          multiple
          accept=".csv"
        />
        <p>
          <Button variant="contained" onClick={handleUpload}>Lähetä nappi</Button>
        </p>
      </form>
    </Container>
  );
};
export default UploadCsv;
