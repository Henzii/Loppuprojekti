const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'risbeedb.chaer2bml6bd.us-east-2.rds.amazonaws.com', 
    user: 'admin',
    password: 'E9OpIP8h0goyfWzI7Xg5',
})

con.connect((err) => {
    if (err) throw err;
    
    con.query(`INSERT INTO main.users (username, email, passwordHash) VALUES ('Henzi', 'Henzi@test.com', 'Hashshshsh');
    `, (error, result, fields) => {
        console.log(result);
    });

    con.end();
})