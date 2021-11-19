import { useMutation, useQuery } from '@apollo/client';
import { Button, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { ACTIVATE_USER } from '../graphql/mutations';
import { GET_USERS } from '../graphql/queries';

const UnActivatedUsers = () => {
  const [users, setUsers] = useState([]);
  const data = useQuery(GET_USERS);
  const [aktivoi] = useMutation(ACTIVATE_USER, { refetchQueries: [GET_USERS] });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.data && !data.loading) {
      setUsers(data.data.getUsers);
    }
  });
  const handleActivateUser = async (userId) => {
    try {
      await aktivoi({ variables: { userId } });
      enqueueSnackbar(`Tunnus ${userId} aktivoitu!`, { variant: 'success' });
    } catch (e) {
      enqueueSnackbar(`Tunnusta ${userId} ei aktivoitu (${e.message})`, { variant: 'error' });
    }
  };
  return users.map((u) => (
    <Grid container key={u.id} sx={{ width: { md: '50%', xs: '100%' }, marginBottom: '10px' }}>
      <Grid item xs={6}>{u.name}</Grid>
      <Grid item xs={6}>
        <Button onClick={() => handleActivateUser(u.id)}>Aktivoi</Button>
      </Grid>
    </Grid>
  ));
};
export default UnActivatedUsers;
