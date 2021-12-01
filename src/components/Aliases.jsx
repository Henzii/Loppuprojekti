import {
  Button, Grid, IconButton, TextField,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PropTypes from 'prop-types';
import useAliases from '../hooks/useAliases';

const Aliases = ({ userId }) => {
  const { aliakset, addAlias, deleteAlias } = useAliases(userId);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddAlias = async (e) => {
    e.preventDefault();
    try {
      await addAlias(e.target.alias.value, () => {
        enqueueSnackbar('Alias lisätty!', { variant: 'success' });
      });
    } catch (error) {
      enqueueSnackbar(`Aliasta ei lisätty (${error.message})`, { variant: 'error' });
    }
    e.target.alias.value = '';
  };
  const handleRemoveAlias = async (aliasId) => {
    await deleteAlias(+aliasId, (res) => {
      if (res === true) enqueueSnackbar('Alias poistettu!', { variant: 'success' });
      else enqueueSnackbar('Aliasta ei poistettu :P', { variant: 'warning' });
    });
  };
  if (!aliakset) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return (
    <div>
      <h2>Aliaksesi</h2>
      <Grid container alignItems="center" width="600px">
        {aliakset.map((a) => <SingleAlias alias={a} key={a.id} del={handleRemoveAlias} />)}
      </Grid>
      <h3>Lisää alias</h3>
      <form onSubmit={handleAddAlias}>
        <TextField name="alias" placeholder="Lisää alias" size="small" />
        &nbsp;
        <Button type="submit" variant="contained">Lisää</Button>
      </form>
    </div>
  );
};

const SingleAlias = ({ alias, del }) => (
  <>
    <Grid item xs={4}>{alias.alias}</Grid>
    <Grid item xs={8}><IconButton onClick={() => del(alias.id)}><DeleteForeverIcon color="error" /></IconButton></Grid>
  </>
);
SingleAlias.propTypes = {
  alias: PropTypes.shape().isRequired,
  del: PropTypes.func.isRequired,
};
Aliases.propTypes = {
  userId: PropTypes.string,
};
Aliases.defaultProps = {
  userId: null,
};

export default Aliases;
