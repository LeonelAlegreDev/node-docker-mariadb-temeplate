const mariadb = require('mariadb');
const { DB_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

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
         console.error('Error al conectar a la base de datos MariaDB:', error);
         throw error; // Lanza el error para manejarlo más adelante si es necesario.
     }
}
module.exports = { pool, dbConnect };
