/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const GET_COMPETITIONS = gql`
query {
  getCompetitions {
    game
    paivays
    name
    layout
    playerName
    total
    hc
    par
  }
}
`;
export const GET_USERS = gql`
query {
  getUsers (active: false) {
    id
    name
    email
  }
}
`;
export const GET_SETUP = gql`
query {
  getSetup {
    ignoreHcBefore
    ignoreMatchBefore
    minPlayersForHc
    minPlayersForMatch
  }
}
`;
