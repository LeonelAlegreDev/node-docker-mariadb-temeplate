/**
 * Modulo de JS que ejecuta una consulta a la base de datos.
 * y retorna el reusltado de la base de datos o lanza un error
 */
const { pool } = require('../config/mariadb');

async function executeQuery(query) {
    let connection;
    try {
        connection = await pool.getConnection();
        const result = await connection.query(query)
        //espera a que se ejecute la consulta y cuando retorna manda el resultado
        return result;
    } catch (error) {
        throw error;
    }
    finally {
        if (connection) connection.release();
    }
}

module.exports = { executeQuery };