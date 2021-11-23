import { gql } from 'apollo-server-express';

const typeDefs = gql`

    scalar Upload
    scalar Date

    type Alias {
        id: ID!
        alias: String
        user: Int
    }
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    type User {
        id: ID!
        name: String!
        rooli: String!
        email: String
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
    type Setup {
        minPlayersForMatch: Int!
        minPlayersForHc: Int!
        ignoreMatchBefore: Date!
        ignoreHcBefore: Date!
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
        getUsers(active: Boolean): [User]!
        getUser(id: Int, name: String): User
        getMe(fetchFromDatabase: Boolean): User
        getLogs(process: String): [LogEntry]!

        getCourseStats: [SimpleCourseStats]
        getAliases( userId: ID): [Alias]!

        getCompetitions: [Competition]
        getSetup: Setup!

    }
    type Competition {
        game: Int
        paivays: String
        name: String
        layout: String
        par: Int
        playerName: String
        total: Int
        hc: Float
    }
    type Mutation {
        addUser(name: String! email: String password: String!): User
        login(name: String! password: String!): String

        addGame(game: Game!): Int
        addAlias(userId: ID, alias: String!): Int
        deleteAlias(aliasId: Int!): Boolean

        uploadCsvFile(file: Upload!): File!

        updateUser(email: String, password: String, rooli: String, userId: ID): String
        activateUser(userId: ID!): String
        deleteUser(userId: ID!): String

        setSetup(
            minPlayersForMatch: Int,
            minPlayersForHc: Int,
            ignoreHcBefore: Date,
            ignoreMatchBefore: Date
        ): String
    }
`;

export default typeDefs;