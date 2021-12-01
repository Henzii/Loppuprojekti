import mysql from 'mysql2/promise';

export const makeConnection = () => {
    try {
        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'main',
            connectTimeout: 120
        });
    } catch (e) {
        console.log(`Ei yhteyttä tietokantaan! ${process.env.DB_HOST}`);
        throw new Error('Ei yhteyttä tietokantaan');
    }
}

