import { Game } from "./services/gameService"

export interface User {
    id: number,
    name: string,
    email?: string,
    rooli: string,
    passwordHash: string,
    active: boolean
}
export type SafeUser = Omit<User, "passwordHash">

export type MutationLoginArgs = {
    name: string | undefined,
    password: string | undefined
}
export type MutationAddUserArgs = {
    name: string | undefined,
    email: string | undefined,
    password: string | undefined
}
export type MutationAddGameArgs = {
    game: Game
}

export type DecodedToken = {
    name: string,
    id: number,
    rooli: string,
    iat: number
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