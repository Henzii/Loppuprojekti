
import { graphQLAuthError, makeHeaders } from './testHelpers';
import App from '../index';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { validString } from '../utils/validators';
//import { makeConnection } from '../utils/mySqlHelpers';
dotenv.config();
let normalUserToken: string;
const normalUserPayload = {
    id: 123,
    name: 'Tester',
    rooli: 'User'
}

describe('Ei sisäänkirjautuneen testit', () => {
    beforeAll(() => {
        if (!validString(process.env.TOKEN_KEY)) {
            console.log('TOKEN_KEY ei asetettu!')
        } else {
            normalUserToken = jwt.sign(normalUserPayload, process.env.TOKEN_KEY) as JsonWebKey as string;
        }
    })
    test('getUsers', async () => {
        const { errors } = await App.executeOperation(
            { query: 'query { getUsers { id name }}' },
            makeHeaders(null)
        );
        graphQLAuthError(errors)
    })
    test('getSetup', async () => {
        const { errors } = await App.executeOperation({ query: 'query { getSetup { minPlayersForMatch }}' }, makeHeaders(null))
        graphQLAuthError(errors);
    })
    test('getUser', async () => {
        const { errors } = await App.executeOperation({ query: 'query { getUser { id }}' }, makeHeaders(null))
        graphQLAuthError(errors);
    })
    test('getLogs', async () => {
        const { errors } = await App.executeOperation({ query: 'query { getLogs { message }}' }, makeHeaders(null))
        graphQLAuthError(errors);
    })
    test('getCourseStats', async () => {
        const { errors } = await App.executeOperation({ query: 'query { getCourseStats { rata }}' }, makeHeaders(null))
        graphQLAuthError(errors);
    })
    test('getAliases', async () => {
        const { errors } = await App.executeOperation({ query: 'query { getAliases { id }}' }, makeHeaders(null))
        graphQLAuthError(errors);
    })
});
describe('Tavallisen käyttäjän testit', () => {
    test('geMe dekoodaa tokenin oikein', async () => {
        const res = await App.executeOperation({ query: 'query { getMe { id name rooli } }' }, makeHeaders(normalUserToken))
        expect(+res.data?.getMe.id).toBe(normalUserPayload.id)
    })
    test.todo('getLogs palauttaa jotain')
    test('getUser palauttaa errorin (ei adminin oikeuksia)', async () => {
        const res = await App.executeOperation({ query: 'query { getUser (id: 1) { id name } }' }, makeHeaders(normalUserToken))
        graphQLAuthError(res.errors);

    })
})

