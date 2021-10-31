import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then( ({ url }) => {
    console.log(`Serveri at ${url}`);
})