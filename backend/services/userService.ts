import { UserInputError } from 'apollo-server-errors';
import mysql from 'mysql2/promise'
import { makeConnection } from '../utils/mySqlHelpers';
import { User } from '../types';
import log from './logService';
import { MysqlError } from 'mysql';

const getAllUsers = async (active: boolean | undefined = undefined): Promise<User[] | []> => {

    const con = await makeConnection();

    try {
        const query = `
            SELECT * FROM user
            ${(active !== undefined) ? 'WHERE active = ?' : ''}
        `
        const [rows] = await con.query(query, [active]) as unknown[];
        return rows as User[];

    } catch (e) {
        throw new Error(e as string);
    } finally {
        con.end();
    }
}

const getUser = async (param: number | string): Promise<User | null> => {
    const con = await makeConnection();
    if (!con) {
        console.log('Yhteys epäonnistui', con);
        throw new Error('Ei yhteyttä tietokantaan');
    }
    try {
        const [rows] = await con.query(`SELECT * from user WHERE ${(typeof param === 'string') ? 'name' : 'id'} = ?`, param) as mysql.RowDataPacket[];
        if (rows.length === 0) return null;
        return rows[0] as User;
    } catch (e) {
        console.log('getUser fail!', e);
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
        log('UserService', 'success', `Tunnus ${name} luotiin onnistuneesti`);
        return rows as mysql.ResultSetHeader
    } catch (e) {
        log('UserService', 'error', `Tunnuksen ${name} luonti epäonnistui. Error: ${e}`)
        throw new UserInputError(`Tunnus on jo käytössä`);
    } finally {
        con.end();
    }
}

const getAliases = async (userId: number) => {
    const con = await makeConnection();
    try {
        const [rows] = await con.query('SELECT id, alias from alias WHERE user = ?', userId);
        return rows;
    } catch (e) {
        log('UserService', 'error', `Ei voitu hakea aliakseia käyttäjälle ${userId}`);
    } finally {
        con.end();
    }
}
const addAlias = async (userId: number, alias: string) => {
    const con = await makeConnection();
    try {
        const [result] = await con.query('INSERT INTO alias (user, alias) VALUES (?,?)', [userId, alias]) as mysql.ResultSetHeader[];
        return result.insertId;
    } catch (e) {
        log('UserService', 'error', `Aliasta ei voitu lisätä (${userId}, ${alias}). Error: ${e}`);
        if ((e as MysqlError).code === 'ER_DUP_ENTRY')
            throw new UserInputError('Alias on jo olemassa')
        throw new Error('Mystinen virhe');
    } finally {
        con.end();
    }
}
const deleteAlias = async (aliasId: number, userId: number | undefined) => {
    const con = await makeConnection();
    try {
        const [res] = await con.query(`DELETE from alias WHERE id = ? ${(userId) ? 'AND user = ?' : ''}`, [aliasId]) as mysql.ResultSetHeader[];
        return res.affectedRows;
    } catch (e) {
        log('UserService', 'error', `Aliasta ei voitu poistaa (id: ${aliasId}), ${e}`);
        throw Error('Aliasta ei voitu poistaa :P');
    } finally {
        con.end();
    }
}
const updateUser = async (passwordHash: string | undefined, email: string | undefined, userId: number, rooli: string | undefined) => {
    if (!passwordHash && !email && !rooli) throw new Error('Antaisit edes yhden parametrin');
    const con = await makeConnection();
    const vars: any = [];

    // Lisätään annetut parametrit vars-muuttujaan
    if (passwordHash) vars['passwordHash'] = passwordHash;
    if (email) vars['email'] = email;
    if (rooli) vars['rooli'] = rooli;

    // Luodaan mysqlquery
    const query = `
        UPDATE user SET
        ${Object.keys(vars).map(k => k + ' = ?').join(', ')}
        WHERE id = ?
    `;
    console.log('Updating user: ', query, 'arvot: ', vars);
    const [res] = await con.query(query, [...Object.values(vars), userId]) as mysql.ResultSetHeader[];
    con.end();
    return res.changedRows;
}
const activateUser = async (userId: number) => {
    const con = await makeConnection();
    const query = `
        UPDATE user SET
        active = 1
        WHERE id = ?
    `;
    const [res] = await con.query(query, userId) as mysql.ResultSetHeader[];
    con.end();
    return res.affectedRows;
}
const deleteUser = async (userId: number) => {
    const con = await makeConnection();

    // Ei poista jos on aliaksia.
    const query = `
        DELETE FROM user
        WHERE id = ?
    `;
    const [res] = await con.query(query, userId) as mysql.ResultSetHeader[];
    con.end();
    return res.affectedRows;
}
export default {
    getAllUsers, addUser, getUser, getAliases,
    addAlias, deleteAlias, updateUser, activateUser,
    deleteUser,
}