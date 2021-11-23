/* eslint-disable no-unused-vars */
import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@apollo/client';
import React from 'react';
import { useSnackbar } from 'notistack';
import { CREATE_USER } from '../graphql/mutations';
import FormikField from './FormikField';

function CreateAccount() {
  const [createUser, createUserData] = useMutation(CREATE_USER);
  const { enqueueSnackbar } = useSnackbar();

  const handleCreation = async ({ tunnus, password, email }) => {
    try {
      await createUser({
        variables: {
          name: tunnus,
          password,
          email,
        },
      });
      enqueueSnackbar('Tunnus luotiin onnistuneesti!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Virhe tunnuksen luomisessa!', { variant: 'error' });
    }
  };

  if (createUserData.data?.addUser.id) {
    return (
      <>
        <Typography variant="h4">Tunnus luotu</Typography>
        <Typography paragraph>
          Tunnus luotiin onnistuneesti! Voit kirjautua sillä sisään jahka se ensin aktivoidaan.
        </Typography>
      </>
    );
  }
  return (
    <Formik
      initialValues={{
        tunnus: '', password: '', password2: '', email: '',
      }}
      onSubmit={(values) => handleCreation(values)}
      validateOnChange={false}
      validate={(values) => {
        const errorit = {};
        if (values.password !== values.password2) {
          errorit.password2 = 'Salasanat ei täsmää!';
        } else if (values.password.length < 5) {
          errorit.password = 'Hey ainakin 5 merkkiä pitkä salasana dänks';
        }
        if (values.tunnus.length <= 3) {
          errorit.tunnus = 'Liian lyhyt tunnus';
        }
        return errorit;
      }}
    >
      <Form>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>Tunnus:</Grid>
          <Grid item xs={12} md={6}><Field name="tunnus" component={FormikField} placeholder="Tunnus..." /></Grid>
          <Grid item xs={12} md={6}>Salasana:</Grid>
          <Grid item xs={12} md={6}><Field name="password" component={FormikField} type="password" placeholder="Salasana..." /></Grid>
          <Grid item xs={12} md={6}>Vahvista salasana:</Grid>
          <Grid item xs={12} md={6}><Field name="password2" component={FormikField} type="password" placeholder="Vahvista salasana" /></Grid>
          <Grid item xs={12} md={6}>Sähköposti:</Grid>
          <Grid item xs={12} md={6}><Field name="email" component={FormikField} type="email" placeholder="Sähköposti" /></Grid>
          <Grid item xs={12} md={6}><Button type="submit">Luo</Button></Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
export default CreateAccount;
