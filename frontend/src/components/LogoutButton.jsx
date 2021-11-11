import { Button } from '@mui/material';
import { useApolloClient } from '@apollo/client';
import React from 'react';

const LogoutButton = () => {
  const client = useApolloClient();
  const handleLogout = async () => {
    await client.clearStore();
    await client.resetStore();
    document.cookie = 'suklaaKeksi=; Max-Age=-99999999;';
  };
  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;
