import React from 'react';
import {
  Button, Divider, TextField, Typography,
} from '@mui/material';
import { useLazyQuery } from '@apollo/client';

import UnActivatedUsers from '../../components/UnActivatedUsers';
import { GET_USER } from '../../graphql/queries';
import SimpleUser from './SimpleUser';
import Aliases from '../../components/Aliases';

const Admin = () => {
  const [haeUser, { data }] = useLazyQuery(GET_USER);
  const handleGetUser = (e) => {
    e.preventDefault();
    haeUser({ variables: { name: e.target.tunnus.value } });
  };
  return (
    <div className="wideContainer">
      <Typography variant="h1">Admin</Typography>
      <Typography paragraph>By your command</Typography>
      <Typography variant="h3">Aktivoi tunnuksia</Typography>
      <UnActivatedUsers />
      <Divider />
      <Typography variant="h3">Muokkaa tunnusta</Typography>
      <form onSubmit={handleGetUser} style={{ marginBottom: '20px' }}>
        <TextField name="tunnus" label="Anna tunnus" />
        <Button type="submit">Hae</Button>
      </form>
      {(data?.getUser && (
        <>
          <SimpleUser user={data.getUser} />
          <Divider />
          <Typography variant="h3">
            Käyttäjän&nbsp;
            {data.getUser.name}
            &nbsp;aliakset
          </Typography>
          <Aliases userId={data.getUser.id} />
        </>
      ))}
    </div>
  );
};
export default Admin;
