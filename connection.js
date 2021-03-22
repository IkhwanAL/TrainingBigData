const mysql = require('mysql');
require('dotenv/config');

const pool = mysql.createPool({
    host:       process.env.DB_HOST || '127.0.0.1',
    user:       process.env.DB_USER,
    pass:       process.env.DB_PASS,
    database:   process.env.DB_NAME,
    port:       process.env.DB_PORT || '3306',
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

const Con = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((er, con) => {
            if(er) reject(er);
            resolve(con);
        })
    })
}

module.exports = {Con, mysql}