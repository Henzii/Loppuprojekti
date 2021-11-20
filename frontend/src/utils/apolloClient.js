import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = () => {
  try {
    const yhteys = new ApolloClient({
      cache: new InMemoryCache(),
      link: createUploadLink({
        uri: 'https://risbeegomfkerho-env.eba-bw33rqyj.us-east-2.elasticbeanstalk.com/graphql',
        credentials: 'same-origin',
      }),
    });
    return yhteys;
  } catch {
    console.log('Ei saaty yhteyttä GraphQl-palvelimeen!');
  }
  return null;
};
export default client();
