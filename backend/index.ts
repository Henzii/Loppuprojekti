import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import express from 'express';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
import jwt from 'jsonwebtoken';
import { DecodedToken } from './types';
import { graphqlUploadExpress } from 'graphql-upload';

const app = express();

dotenv.config();

app.use(graphqlUploadExpress());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: reqWithUser }) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            try {
                jwt.verify(token, process.env.TOKEN_KEY as string)
                const user = jwt.decode(token) as DecodedToken;
                return { user };
            } catch {
                return null;
            }
        }
    }
})

server.start().then(() => {
    const portti = process.env.PORT || 8080;
    app.use(cors({
        origin: process.env.ORIGIN,
    }));
    app.use(express.static(path.join(__dirname, '../build/')));
    app.get('*', function (req, res) {
        if (!req.path.startsWith('/graphql'))
            res.sendFile(path.resolve(__dirname, '../build/index.html'));
    });
    server.applyMiddleware({ app, cors: false });
    app.listen({ port: portti }, () => {
        console.log(`Serveri pyörii portissa ${portti}\nDatabase: ${process.env.DB_HOST}`);
        console.log(`GraphqlPath: ${server.graphqlPath}`);
    });
}).catch((error) => {
    console.log('Yhteyttä ei voida muodostaa!', error);
});

export interface reqWithUser extends express.Request {
    user: {
        id: number,
        name: string,
        rooli: string,
    }
}