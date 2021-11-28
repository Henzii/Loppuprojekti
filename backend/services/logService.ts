import { makeConnection } from "../utils/mySqlHelpers";

const writeLog = async (process: logProcess, type: logType, message: string): Promise<void> => {
    const con = await makeConnection();
    await con.query('INSERT into logs (process, type, message) VALUES (?)', [[process, type, message]])
    con.end();
}
export const readLogs = async (process: logProcess | ''): Promise<SingleLogEntry[] | []> => {
    const con = await makeConnection();
    const [rows] = await con.query(`SELECT * from logs ${(process !== '' ? 'where process = ?' : '')}`, process) as unknown[];
    con.end();
    return rows as SingleLogEntry[];
}

export default writeLog;

export type logProcess = 'MySQL' | 'UserService' | 'LoginService' | 'GameService' | 'CsvParser';
export type logType = 'error' | 'success' | 'warning' | 'info'

interface SingleLogEntry {
    date: Date,
    process: logProcess,
    type: logType,
    message: string
}