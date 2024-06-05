const mariadb = require('mariadb');
const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;

const pool = mariadb.createPool({
     host: DB_HOST, 
     user: DB_USER, 
     password: DB_PASSWORD,
     connectionLimit: 5
});
module.exports = pool;
