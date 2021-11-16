import { median } from '../utils/mathAndShit';
import { GraphQLUpload } from 'graphql-upload';

import { mutations } from './mutations';
import { queries } from './queries';

const resolvers = {

    ...mutations,
    ...queries,

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

export type StatsRootArgs = {
    tenLatestRounds: string,
    tenLatestMedian: number,
    hc: number,
    par: number
}
export default resolvers;
