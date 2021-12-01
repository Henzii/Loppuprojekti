import { useMutation, useQuery } from '@apollo/client';
import { Button, CircularProgress, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { ACTIVATE_USER, DELETE_USER } from '../graphql/mutations';
import { GET_USERS } from '../graphql/queries';

const UnActivatedUsers = () => {
  const [users, setUsers] = useState([]);
  const data = useQuery(GET_USERS);
  const [aktivoi] = useMutation(ACTIVATE_USER, { refetchQueries: [GET_USERS] });
  const [poista] = useMutation(DELETE_USER, { refetchQueries: [GET_USERS] });
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
  const handleDeleteUser = async (userId) => {
    try {
      await poista({ variables: { userId } });
      enqueueSnackbar(`Tunnus ${userId} poistettu!`, { variant: 'warning' });
    } catch (e) {
      enqueueSnackbar(`Virhe tunnuksen positamisessa: ${e}`, { variant: 'error' });
    }
  };
  if (!data.data?.getUsers) return (<CircularProgress />);
  if (data.error) {
    return (
      <>
        Error:
        {data.error.message}
      </>
    );
  }
  if (users.length === 0) return (<>Ei aktivoitavia tunnuksia</>);
  return (
    <Grid container sx={{ width: { md: '50%', xs: '100%' } }} alignItems="center" spacing={3}>
      {users.map((u) => (
        <React.Fragment key={u.id}>
          <Grid item xs={6}>{u.name}</Grid>
          <Grid item xs={6}>
            <Button onClick={() => handleActivateUser(u.id)}>Aktivoi</Button>
            &nbsp;
            <Button onClick={() => handleDeleteUser(u.id)}>Poista</Button>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};
export default UnActivatedUsers;
