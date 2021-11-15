import userService from '../services/userService';
import { DecodedToken, GoodCompetitionData, MutationAddGameArgs, MutationAddUserArgs, MutationLoginArgs, RawCompetitionData, SafeUser, User } from '../types';
import bcrypt from 'bcrypt';
import { validString } from '../utils/validators';
import { UserInputError, ApolloError, AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';
import gameService from '../services/gameService';
import { logProcess, readLogs } from '../services/logService';
import statsService from '../services/statsService';
import { median } from '../utils/mathAndShit';
import { GraphQLUpload } from 'graphql-upload';
import fs from 'fs';
import { finished } from 'stream';
import { parseCsv } from '../utils/csvParser';
import setupService from '../services/setupService';

const resolvers = {
    Query: {
        getSetup: async (_roow: unknown, _args: unknown, context: ContextUserToken) => {
            if (context.user?.rooli !== 'admin') throw new AuthenticationError('Access denied');
            const res = await setupService.getSetup();
            return res;
        },
        getUsers: async () => {
            const res = await userService.getAllUsers();
            return res;
        },
        getUser: async (_root: unknown, args: Pick<User, "name" | "id">) => {
            const res = await userService.getUser(
                (args.id) ? args.id : args.name
            );
            return res;
        },
        getMe: async (_root: unknown, args: { fetchFromDatabase: boolean }, context: { user: DecodedToken }) => {
            if (!context.user) return null;
            if (args.fetchFromDatabase) {
                const res = await userService.getUser( context.user.id );
                return res;
            }
            return context.user;
        },
        getLogs: async (_root: unknown, args: { process: logProcess }, context: { user: DecodedToken }) => {
            const prosessi = (args.process) ? args.process : '';

            // Kirjautuneille CsvParserin logit, adminille kaikki
            if (!context.user || (prosessi !== 'CsvParser' && context.user.rooli !== 'admin')) {
                throw new AuthenticationError('Ei oikeuksia!')
            }
            const res = await readLogs(prosessi);
            return res;
        },
        getCourseStats: async (_root: unknown, _args: undefined, context: { user: DecodedToken }) => {
            if (!context.user) throw new AuthenticationError('Access denied');
            const res = await statsService.getSimpleCourseStats(context.user.id);
            return res;
        },
        getAliases: async (_root: unknown, args: { userId: number }, context: { user: DecodedToken }) => {
            if (!context.user || (args.userId !== context.user.id && context.user.rooli !== 'admin')) {
                throw new AuthenticationError('Access denied');
            }
            const res = await userService.getAliases((args.userId || context.user.id));
            return res;
        },
        getCompetitions: async( _root: unknown, _args: unknown, _contest: unknown) => {
            const res = await statsService.getCompetitions() as Array<RawCompetitionData>;
            return res;
        }
    },

    Mutation: {
        addUser: async (_root: unknown, args: MutationAddUserArgs) => {

            if (!validString(args.name) || !validString(args.password)) throw new UserInputError('Argumentit ei kelpaa...');

            const hashedPassoword = await bcrypt.hash(args.password, 10);
            const res = await userService.addUser(args.name, args.email, hashedPassoword);
            const newUser: SafeUser = {
                id: res.insertId,
                name: args.name,
                email: args.email,
                rooli: 'user',
                active: false,
            }
            return newUser;
        },
        login: async (_root: unknown, args: MutationLoginArgs) => {
            const { name, password } = args;
            if (!validString(name) || !validString(password)) {
                throw new UserInputError('Väärä tunnus tai salasana')
            } else {
                const user = await userService.getUser(name);
                if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw new UserInputError('Väärä tunnus tai salasana');
                else {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        rooli: user.rooli,
                    }
                    if (!validString(process.env.TOKEN_KEY)) throw new ApolloError('Avaimet hukassa')
                    const token = jwt.sign(payload, process.env.TOKEN_KEY) as JsonWebKey;
                    return token;
                }
            }
        },
        addGame: async (_root: unknown, args: MutationAddGameArgs) => {
            try {
                return gameService.addGame(args.game);
            } catch (e) {
                throw new Error('Peliä ei voitu lisätä!')
            }
        },
        addAlias: async (_root: unknown, args: { alias: string, userId: number }, context: { user: DecodedToken }) => {
            if (args.userId && context.user.rooli !== 'admin') throw new AuthenticationError('Access denied');
            if (!args.alias) throw new UserInputError('What alias?');
            const userId = args.userId || context.user.id;
            try {
                return userService.addAlias(userId, args.alias);
            } catch (e) {
                throw new UserInputError('Aliasta ei voitu lisätä :P');
            }
        },
        deleteAlias: async (_root: unknown, args: { aliasId: number }, context: { user: DecodedToken }) => {
            if (!context?.user?.id) throw new AuthenticationError('Access denied');
            let userId: number | undefined = context.user.id;

            if (context.user.rooli === 'admin') userId = undefined;

            const poistetut = await userService.deleteAlias(args.aliasId, userId);
            if (poistetut > 0)
                return true;
            return false;
        },
        uploadCsvFile: async (_paret: unknown, args: any, context: { user: DecodedToken }) => {
            if (!context.user?.id) throw new AuthenticationError('Access denied');
            return args.file.then((file: any) => {
                const { createReadStream, filename, mimetype } = file
                const fileStream = createReadStream();
                fileStream.pipe(fs.createWriteStream(`./upload/${context.user.name}.csv`));
                finished(fileStream, () => {
                    parseCsv(`${context.user.name}.csv`, context.user.name);
                })
                return file;
            });
        },
        setSetup: async(_root: unknown, args: SetupArgs, context: ContextUserToken) => {
            if (context.user?.rooli !== 'admin') throw new AuthenticationError('Access denied');
            console.log( await setupService.writeSetup(args)) ;
        },
    },
    Upload: GraphQLUpload,

    Competition: {
        hc: (root: StatsRootArgs) => {
            if (!root.tenLatestRounds) return 0;
            const kierrokset = root.tenLatestRounds.split(',').map(Number);
            return median(kierrokset) - root.par;
        },
    },
    SimpleCourseStats: {
        tenLatestRounds: (root: StatsRootArgs) => {
            const kierrokset = root.tenLatestRounds.split(',').map(Number);
            root.tenLatestMedian = median(kierrokset);
            root.hc = root.tenLatestMedian - root.par;
            return kierrokset;
        },
    },
}
interface StatsRootArgs {
    tenLatestRounds: string,
    tenLatestMedian: number,
    hc: number,
    par: number
}
export type SetupArgs = {
    minPlayersForMatch?: number,
    minPlayersForHc?: number,
    ignoreHcBefore?: string,
    ignoreMatchBefore?: string,
}
type ContextUserToken = {
    user: DecodedToken
}
export default resolvers;