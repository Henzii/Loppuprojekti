import { Button } from '@mui/material';
import { useApolloClient } from '@apollo/client';
import React from 'react';
import { GET_ME } from '../graphql/mutations';
import { useLoggedIn } from './LoggedUserProvider';

const LogoutButton = () => {
  const client = useApolloClient();
  const logged = useLoggedIn();
  const handleLogout = async () => {
    await client.clearStore();
    await client.resetStore();
    await client.refetchQueries({ include: [GET_ME] });
    document.cookie = 'suklaaKeksi=; Max-Age=-99999999;';
    logged.clear();
  };
  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;
