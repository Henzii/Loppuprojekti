import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../graphql/mutations';
import { GET_USER } from '../../graphql/queries';

const SimpleUser = ({ user }) => {
  const [saveUser] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USER, { variables: { userId: user.id } }],
  });
  const handleSaveUser = async (e) => {
    e.preventDefault();
    await saveUser({
      variables: {
        email: e.target.email.value,
        rooli: e.target.rooli.value,
        userId: user.id,
      },
    });
  };
  return (
    <form onSubmit={handleSaveUser}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={6}>Id</Grid>
        <Grid item xs={6}>{user.id}</Grid>
        <Grid item xs={6}>Tunnus</Grid>
        <Grid item xs={6}>{user.name}</Grid>
        <Grid item xs={6}>Email</Grid>
        <Grid item xs={6}><TextField name="email" defaultValue={user.email} /></Grid>
        <Grid item xs={6}>Rooli</Grid>
        <Grid item xs={6}><TextField name="rooli" defaultValue={user.rooli} /></Grid>
        <Grid item xs={6}><Button type="submit">Tallenna</Button></Grid>
      </Grid>
    </form>
  );
};

SimpleUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rooli: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
export default SimpleUser;
