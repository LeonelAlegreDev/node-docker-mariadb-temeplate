const mariadb = require('mariadb');
const { DB_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
const { PublicError } = require('../errors/PublicError');

const pool = mariadb.createPool({
    host: DB_HOST, 
    user: MYSQL_USER, 
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    connectionLimit: 5
});
async function dbConnect() {
     try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos MariaDB establecida con éxito');
        connection.release(); // Es importante liberar la conexión.
     } catch (error) {
        throw new PublicError('Error al conectar a la base de datos MariaDB', null, 503);;
     }
}
module.exports = { pool, dbConnect };