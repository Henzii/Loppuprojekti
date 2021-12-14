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
import { checkStuff } from './utils/checkStuff';

const app = express();

dotenv.config();
console.clear();
console.log(`____ _ ____ ___  ____ ____ ____ ____ _  _ ____ _  _ ____ ____ _  _ ____ 
|__/ | [__  |__] |___ |___ | __ |  | |\\/| |___ |_/  |___ |__/ |__| |  | 
|  \\ | ___] |__] |___ |___ |__] |__| |  | |    | \\_ |___ |  \\ |  | |__|`)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: { headers: { authorization: string }}} ) => {
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

server.start().then(async () => {

    if (process.env.NODE_ENV === 'test') return;

    await checkStuff(); // Tarkastaa onko ympäristömuuttujat määritelty ja toimiiko tietokantayhteys
    app.use(graphqlUploadExpress());

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
        console.log(`\x1b[32mServeri pyörii portissa \x1b[1m${portti}\x1b[0m 👍`);
    });
}).catch((error) => {
    console.log('Yhteyttä ei voida muodostaa!', error);
});

export interface reqWithUser {
    user: {
        id: number,
        name: string,
        rooli: string,
    }
}

export default server;