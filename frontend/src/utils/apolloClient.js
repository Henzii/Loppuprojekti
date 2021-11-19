import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = () => {
  try {
    const yhteys = new ApolloClient({
      cache: new InMemoryCache(),
      link: createUploadLink({
        uri: '/graphql',
        credentials: 'include',
      }),
    });
    return yhteys;
  } catch {
    console.log('Ei saaty yhteyttä GraphQl-palvelimeen!');
  }
  return null;
};
export default client();
