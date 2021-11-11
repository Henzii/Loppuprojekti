import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Alias {
        id: ID!
        alias: String
        user: Int
    }
    type User {
        id: ID!
        name: String!
        rooli: String!
    }
    type Alias {
        id: ID!
        alias: String!
    }
    type LogEntry {
        date: String!
        process: String!
        type: String!
        message: String!
    }
    type SimpleCourseStats {
        nimi: String
        rata: String
        layout: String
        par: Int
        latest: Int
        min: Float
        max: Float
        avg: Float
        games: Int
        tenLatestRounds: [Int]
        tenLatestMedian: Float
        hc: Float
    }
    input Game {
        course: String!
        layout: String!
        date: String!
        par: Int!
        players: [Player]
    }
    input Player {
        name: String!
        total: Int!
        scores: [Int!]!
    }
    type Query {
        getUsers: [User]!
        getUser(id: Int, name: String): User
        getMe: User
        getLogs(process: String): [LogEntry]!

        getCourseStats: [SimpleCourseStats]
        getAliases( userId: ID): [Alias]!
    }

    type Mutation {
        addUser(name: String! email: String password: String!): User
        login(name: String! password: String!): String

        addGame(game: Game!): Int
        addAlias(userId: ID, alias: String!): Int
        deleteAlias(aliasId: Int!): Boolean
    }
`;

export default typeDefs;