import React from 'react';
import { Container, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import CreateAccount from './components/CreateAccount';
import LoginForm from './components/LoginForm';
import { GET_ME } from './graphql/mutations';

function App() {
  useQuery(GET_ME);
  return (
    <Container>
      <Typography variant="h4">Herou</Typography>
      <CreateAccount />
      <LoginForm />
    </Container>
  );
}

export default App;
