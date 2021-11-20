import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = window.sessionStorage.getItem('suklaaJuna');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(createUploadLink({
    uri: (process.env.NODE_ENV === 'development')
      ? 'http://localhost:8080/graphql'
      : 'https://risbeegomfkerho-env.eba-bw33rqyj.us-east-2.elasticbeanstalk.com/graphql',
    credentials: 'include',
  })),
});

export default client;
