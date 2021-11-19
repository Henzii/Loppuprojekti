import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation($email: String, $password: String) {
    updateUser(email: $email, password: $password)
  }
`;
export const ACTIVATE_USER = gql`
  mutation($userId: ID!) {
    activateUser(userId: $userId)
  }
`;
export const SAVE_SETUP = gql`
  mutation ($minPlayersForMatch: Int, $minPlayersForHc: Int, $ignoreHcBefore: Date, $ignoreMatchBefore: Date) {
    setSetup(
      minPlayersForMatch: $minPlayersForMatch,
      minPlayersForHc: $minPlayersForHc,
      ignoreHcBefore: $ignoreHcBefore,
      ignoreMatchBefore: $ignoreMatchBefore
    )
  }
`;

export const UPLOAD_CSV = gql`
  mutation($file: Upload!) {
    uploadCsvFile(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export const CREATE_USER = gql`
  mutation($name: String!, $password: String!, $email: String) {
    addUser(name: $name, password: $password, email: $email) {
      id
    }
  }
`;

export const LOGIN = gql`
mutation($name: String!, $password: String!) {
  login(name: $name, password: $password)
  
}
`;
export const ADD_ALIAS = gql`
mutation ($alias: String!) {
  addAlias(alias: $alias)
}
`;
export const DELETE_ALIAS = gql`
mutation ($aliasId: Int!) {
  deleteAlias(aliasId: $aliasId)
}
`;
export const GET_LOGS = gql`
  query {
    getLogs {
      date
      process
      type
      message
    }
  }
`;

export const GET_ME = gql`
query ($fetchFromDatabase: Boolean) {
  getMe (fetchFromDatabase: $fetchFromDatabase) {
    id
    name
    rooli
    email
  }
}
`;

export const GET_SIMPLE_COURSE_STATS = gql`
query {
  getCourseStats {
    rata
    layout
    par
    min
    max
    avg
    games
    tenLatestRounds
    hc
  }
}
`;
export const GET_ALIASES = gql`
query {
  getAliases {
    id
    alias
  }
}
`;
