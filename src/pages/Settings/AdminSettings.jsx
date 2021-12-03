import {
  Button, Grid, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { useSnackbar } from 'notistack';
import useSetup from '../../hooks/useSetup';

const AdminSettings = () => {
  const { setup, setSetup, saveSetup } = useSetup();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    let { value } = e.target;
    // Jos ennestään on numero -> parsitaan numeroksi tai nollaksi
    if (!Number.isNaN(setup[e.target.name])) value = parseInt(value, 10) || 0;
    setSetup({ ...setup, [e.target.name]: value });
  };
  const handleSave = () => {
    saveSetup().then(() => {
      enqueueSnackbar('Asetukset tallennettiin onnistuneesti', { variant: 'success' });
    }).catch(() => {
      enqueueSnackbar('Virhe asetuksia tallennettaessa', { variant: 'error' });
    });
  };
  return (
    <>
      <Typography variant="h4">Kisa-asetukset</Typography>
      <Grid container spacing={2}>
        {Object.keys(setup).map((k) => {
          if (k.startsWith('__')) return '';
          return (
            <Grid item xs={12} md={6} key={k}>
              <TextField
                name={k}
                value={setup[k]}
                label={k}
                onChange={handleChange}
                style={{ width: '80%' }}
              />
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Button type="submit" onClick={handleSave}>Tallenna</Button>
        </Grid>
      </Grid>

    </>
  );
};
export default AdminSettings;
