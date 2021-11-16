import mysql from 'mysql2/promise';
import { makeConnection } from "../utils/mySqlHelpers";

import { Game, GameID, CourseID } from '../types';

const addGame = async (gameData: Game, connection: mysql.Connection | undefined = undefined): Promise<GameID | null> => {

    const con = (connection !== undefined) ? connection : await makeConnection();

    let id = await getCourseId(gameData.course, gameData.layout, con);

    // Jos radalle ei löydy ID:tä, luodann uusi rata
    if (!id) {
        id = await createCourse({
            course: gameData.course,
            layout: gameData.layout,
            date: gameData.date,
            par: +gameData.par
        }, con) as number
    }

    const gameid = await (createGame(id, gameData.date, con));    // Luodaan uusi peli

    if (!gameid) { if (!connection) con.end(); return null; }   // Jos peli on jo olemassa, palauta null

    for (const player of gameData.players) {
        // Lisätään yhden pelaajan tuloskortti tietokantaan
        await connection?.query(`INSERT INTO scorecard (user, game, course, playerName, total, hc) VALUES (
            null,
            ${gameid},
            ${id},
            '${player.name}',
            ${player.total},
            null);
        `);
        // Lisätään yhden pelaajan tulokset score-taulukkoon
        const qry = `INSERT INTO score(scorecard, score, indeksi) VALUES
            ${player.scores.map((s,i) => `(last_insert_id(), ${s}, ${i+1})\n`)}
        ;`;
        await connection?.query(qry);
    }
    if (connection === undefined) con.end();
    return gameid;
}

const getCourseId = async (courseName: string, layoutName: string, con: mysql.Connection): Promise<number | null> => {

    try {
        const [rows] = await con.query('SELECT id from course WHERE name = ? AND layout = ?', [courseName, layoutName]) as mysql.RowDataPacket[];
        if (rows.length === 0) return null;
        return rows[0].id;
    } catch (e) {
        console.log('Mysql error ' + e);
        return null;
    }
}
const createGame = async (courseId: number, date: Date, con: mysql.Connection): Promise<number | null> => {

    try {
        const [result] = await con.query(`INSERT INTO game (course, date) VALUES (?)`, [[courseId, date]]) as mysql.ResultSetHeader[];
        return result.insertId;
    } catch (e) {
        return null;
    }
}
const createCourse = async (course: Omit<Game, "players">, con: mysql.Connection): Promise<CourseID> => {

    try {
        const [result] = await con.query(`INSERT INTO course (name, layout, par) VALUES (?)`, [[course.course, course.layout, course.par]]) as mysql.ResultSetHeader[];
        return result.insertId;
    } catch (e) {
        console.log(e as string);
        throw e;
    }
}



export default { addGame }