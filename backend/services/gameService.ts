import mysql from 'mysql2/promise';
import { makeConnection } from "../utils/mySqlHelpers";

const addGame = async (gameData: Game): Promise<GameID | null> => {
    
    let id = await getCourseId(gameData.course, gameData.layout);

    // Jos radalle ei löydy ID:tä, luodann uusi rata
    if (!id) {
        id = await createCourse( {
            course: gameData.course,
            layout: gameData.layout,
            date: gameData.date,
            par: +gameData.par
        })
    }

    const gameid = await( createGame( id, gameData.date ) );    // Luodaan uusi peli
    if (!gameid) return null;   // Jos peli on jo olemassa, palauta null

    console.log('RataId: ', id);
    console.log('PeliId: ', gameid); 
    return gameid;
}

const getCourseId = async (courseName: string, layoutName: string): Promise<number | null> => {
    
    const con = await makeConnection();
    const [rows] = await con.query('SELECT id from course WHERE name = ? AND layout = ?', [ courseName, layoutName] ) as mysql.RowDataPacket[];
    con.end();
    if (rows.length === 0) return null;
    return rows[0].id;
}
const createGame = async ( courseId: number, date: Date): Promise<number | null> => {

    const con = await makeConnection();
    try {
        const [result] = await con.query(`INSERT INTO game (course, date) VALUES (?)`, [[courseId, date]]) as mysql.ResultSetHeader[];
        return result.insertId;
    } catch (e) {
        return null;
    } finally {
        con.end();
    }
}
const createCourse = async(course: Omit<Game, "players">): Promise<CourseID> => {
    
    const con = await makeConnection();
    try {
        const [result] = await con.query(`INSERT INTO course (name, layout, par) VALUES (?)`, [[course.course, course.layout, course.par]]) as mysql.ResultSetHeader[];
        return result.insertId;        
    } catch(e) {
        console.log(e as string);
        throw e;
    } finally {
        con.end();
    }
}
export interface Game {
    course: string,
    layout: string,
    date: Date,
    par: number,
    players: Array<Player>
}
export interface Player {
    name: string,
    total: string,
    scores: Array<number>
}
export type GameID = number;
export type CourseID = number;

export default { addGame }