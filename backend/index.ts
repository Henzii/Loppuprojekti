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
import { join } from 'path/posix';

const app = express();

dotenv.config();

const corsOptions = {
    credentials: true,
    origin: 'http://risbeegomfkerho-env.eba-bw33rqyj.us-east-2.elasticbeanstalk.com:8080',
};

app.use(cors(corsOptions));
app.use(graphqlUploadExpress());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: reqWithUser }) => {
        if (req.headers.cookie) {
            const [avain, token] = req.headers.cookie.split('=');
            if (avain === "suklaaKeksi") {
                if (jwt.verify(token, process.env.TOKEN_KEY as string)) {
                    const user = jwt.decode(token) as DecodedToken;
                    return { user };
                }
            }
        }

    },
})
server.start().then(() => {
    app.use(express.static(path.join(__dirname, '../../frontend/build')));
    app.get('*', function (req, res) {
        if (!req.path.startsWith('/graphql'))
            res.sendFile(path.resolve(__dirname, '../../frontend/build/index.html'));
    });
    server.applyMiddleware({ app, cors: false });
    app.listen({ port: process.env.PORT || 8080 }, () => {
        console.log('Server running... maybe');
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