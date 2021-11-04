import { makeConnection } from "../utils/mySqlHelpers";

const writeLog = (process: logProcess, name: logName, message: string): void => {
    makeConnection().then(con => {
        con.query('INSERT into logs (process, name, message) VALUES (?)', [[process, name, message]])
            .catch(e => console.log('Virhe lokin kirjoittamisessa', e.message))
    }).catch(e => console.log('Loki ei saa yhteyttä databaseen', e.message));
}
export const readLogs = async (process: logProcess | ''): Promise<SingleLogEntry[] | []> => {
    const con = await makeConnection();
    const [rows] = await con.query(`SELECT * from logs ${(process !== '' ? 'where process = ?' : '')}`, process) as unknown[];
    console.log(rows);
    return rows as SingleLogEntry[];
}

export default writeLog;

export type logProcess = 'MySQL' | 'UserService' | 'LoginService' | 'GameService' | 'CsvParser';
export type logName = string | undefined | null

interface SingleLogEntry {
    date: Date,
    process: logProcess,
    name: logName,
    message: string
}