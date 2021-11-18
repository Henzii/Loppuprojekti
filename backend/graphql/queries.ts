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
        getUser: async (_root: unknown, args: Pick<User, "name" | "id">) => {
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
        getCompetitions: async (_root: unknown, _args: unknown, context: ContextUserToken) => {
            const res = await statsService.getCompetitions() as Array<RawCompetitionData>;
            if (!context.user?.id) {
                return res.map((r, i) => {
                    return { ...r, playerName: names[Math.floor( Math.random() * names.length )] }
                });
            }
            return res;
        }
    },
};

const names = [
    'Uolevi',
    'Torsti',
    'Vemmel',
    'Velmeri',
    'Jonne',
    'Pasi-Pekka',
    'Jani-Petteri',
    'Irmeli',
    'Taisto',
    'Leif',
    'Jorma69',
    'Usuknoob',
    'Jallu',
    'Pena',
    'Mica',
    'Jerry',
];