import mysql from 'mysql2/promise';

export const makeConnection = () => {
    const database = (process.env.NODE_ENV === 'production')
        ? process.env.DB_DATABASE || 'main'
        : process.env.DB_DEV_DATABASE || 'dev';

    try {
        const yhteys = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database,
        });
        return yhteys;
    } catch (e) {
        throw Error(e as string);
    }
}

