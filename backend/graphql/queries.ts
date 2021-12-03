import userService from "../services/userService";
import setupService from "../services/setupService";
import statsService from "../services/statsService";
import { readLogs } from "../services/logService";

import { AuthenticationError } from "apollo-server-errors";
import { User, DecodedToken, RawCompetitionData } from "../types";
import { logProcess } from "../services/logService";

import { ContextUserToken } from "../types";

export const queries = {
    Query: {
        getSetup: async (_root: unknown, _args: unknown, context: ContextUserToken) => {
            if (context.user?.rooli !== 'admin') throw new AuthenticationError('Access denied');
            const res = await setupService.getSetup();
            return res;
        },
        getUsers: async (_root: unknown, args: { active?: boolean }, context: ContextUserToken) => {
            if (context?.user?.rooli !== 'admin') throw new AuthenticationError('Access denied');
            const res = await userService.getAllUsers(args.active);
            return res;
        },
        getUser: async (_root: unknown, args: Pick<User, "name" | "id">, context: ContextUserToken ) => {
            if (context.user?.rooli !== 'admin') throw new AuthenticationError('Access denied');
            const res = await userService.getUser(
                (args.id) ? args.id : args.name
            );
            return res;
        },
        getMe: async (_root: unknown, args: { fetchFromDatabase: boolean }, context: { user: DecodedToken }) => {
            if (!context.user) return null;
            if (args.fetchFromDatabase) {
                const res = await userService.getUser(context.user.id);
                return res;
            }
            return context.user;
        },
        getLogs: async (_root: unknown, args: { process: logProcess }, context: { user: DecodedToken }) => {
            let prosessi: logProcess | '';
            if (!context.user) throw new AuthenticationError('Access denied');
            if (context.user.rooli !== 'admin') {
                prosessi = 'CsvParser';
            } else prosessi = '';
            const res = await readLogs(prosessi);
            return res;
        },
        getCourseStats: async (_root: unknown, _args: undefined, context: { user: DecodedToken }) => {
            if (!context.user) throw new AuthenticationError('Access denied');
            const res = await statsService.getSimpleCourseStats(context.user.id);
            return res;
        },
        getAliases: async (_root: unknown, args: { userId: number }, context: { user: DecodedToken }) => {
            if (!context.user || (args.userId && args.userId !== context.user.id && context.user.rooli !== 'admin')) {
                throw new AuthenticationError('Access denied');
            }
            const res = await userService.getAliases((args.userId || context.user.id));
            return res;
        },
        getCompetitions: async (_root: unknown, _args: unknown, context: ContextUserToken) => {
            const res = await statsService.getCompetitions() as Array<RawCompetitionData>;
            // Jos ei kirjautunut sisään, muutetaan pelaajien nimet tähdiksi
            if (!context.user?.id) {
                return res.map((r) => {
                    return { ...r, playerName: '******' }
                });
            }
            return res;
        }
    },
};
