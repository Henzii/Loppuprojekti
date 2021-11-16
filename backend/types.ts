export interface User {
    id: number,
    name: string,
    email?: string,
    rooli: string,
    passwordHash: string,
    active: boolean
}

export type RawCompetitionData = {
    game: number,
    paivays: Date,
    name: string,
    layout: string,
    playerName: string,
    total: number
    tenLatestRounds: string,
}
export type GoodCompetitionData = {
    course: {
        name: string,
        layout: string,
    },
    date: Date,
    players: number
}
export type DecodedToken = {
    name: string,
    id: number,
    rooli: string,
    iat: number
}
export type ContextUserToken = {
    user: DecodedToken
}

export type MutationAddGameArgs = {
    game: Game
}
export type SafeUser = Omit<User, "passwordHash">

export interface Game {
    course: string,
    layout: string,
    date: Date,
    par: number,
    players: Array<Player>
}
export interface Player {
    name: string,
    total: number,
    scores: Array<number>
}
export type GameID = number;
export type CourseID = number;
