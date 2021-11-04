import { UserInputError } from 'apollo-server-errors';
import mysql from 'mysql2/promise'
import { makeConnection } from '../utils/mySqlHelpers';
import { User } from '../types';
import log from './logService';

const getAllUsers = async (): Promise<User[] | []> => {

    const con = await makeConnection();

    try {
        const [rows] = await con.query('SELECT * from user') as unknown[];
        return rows as User[];
    
    } catch (e) {
        throw new Error(e as string);
    } finally {
        con.end();
    }
}

const getUser = async (param: number | string): Promise<User | null> => {
    const con = await makeConnection();
    try {
        const [rows] = await con.query(`SELECT * from user WHERE ${(typeof param === 'string') ? 'name' : 'id'} = ?`, param) as mysql.RowDataPacket[];
        if (rows.length === 0) return null;
        return rows[0] as User;
    } catch (e) {
        throw new UserInputError(`SQL virhe'`)
    } finally {
        con.end();
    }
}
const addUser = async (name: string, email: string | undefined, password: string): Promise<mysql.ResultSetHeader> => {
    const con = await makeConnection();
    try {
        const [rows] = await con.query(`INSERT INTO user (name, email, passwordHash, rooli) VALUES (?)`
        , [[name, email, password, 'user']]) as unknown[];
        return rows as mysql.ResultSetHeader
    } catch(e) {
        log('UserService', null, `Tunnuksen ${name} luonti epäonnistui.`)
        throw new UserInputError(`Tunnus on jo käytössä`);
    } finally {
        con.end();
    }
}


export default { getAllUsers, addUser, getUser }