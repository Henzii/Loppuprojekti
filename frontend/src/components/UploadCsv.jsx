import React from 'react';
import {
  Button, Container, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { UPLOAD_CSV } from '../graphql/mutations';

const UploadCsv = () => {
  const [uploadFile] = useMutation(UPLOAD_CSV);
  const { enqueueSnackbar } = useSnackbar();

  const handleUpload = (e) => {
    e.preventDefault();
    uploadFile({ variables: { file: e.target.tiedosto.files[0] } })
      .then(() => {
        enqueueSnackbar('Tiedosto lähetetty!', { variant: 'info' });
      }).catch(() => {
        enqueueSnackbar('Jokin meni vikaan :(', { variant: 'error' });
      });
    e.target.tiedosto.value = null;
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
      <form encType="multipart/form-data" onSubmit={handleUpload}>
        <input
          type="file"
          name="tiedosto"
          id="raised-button-file"
          accept=".csv"
        />
        <p>
          <Button variant="contained" type="submit">Lähetä nappi</Button>
        </p>
      </form>
    </Container>
  );
};
export default UploadCsv;
