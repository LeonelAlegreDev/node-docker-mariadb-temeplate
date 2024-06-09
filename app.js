/**
 * @file app.js
 * @description This file is the entry point of the application. 
 *  It is responsible for creating the express application and starting the server.
 * @requires express - Fast, unopinionated, minimalist web framework for Node.js
 * @requires dotenv - Loads environment variables from a .env file into process.env
 * @requires cors - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
 * @requires ./config/mariadb - MariaDB connection pool configuration.
 * @requires ./routes - Routes of the application
 */

// Load environment variables from .env file
require('dotenv').config()

// Importing modules
const express = require('express')
const cors = require('cors')
const { dbConnect } = require('./config/mariadb');
// importa executeQuery de ./utils/executeQuery
const { executeQuery } = require('./utils/executeQuery');

const routes = require('./routes')

// Constants for the server configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Create express app
const app = express();

// Configure express app
app.use(cors());
app.use(express.json());
app.use('/', routes);

// Connect to the database
dbConnect().then(() => {
    // Iniciar el servidor solo si la conexión a la base de datos fue exitosa
    app.listen(PORT, () => {
        console.log(`Servidor Node.js escuchando en http://${HOST}:${PORT}`);
    });

    const query = "SHOW DATABASES;"
    executeQuery(query).then(result => {
        console.log('La consulta se ejecutó correctamente.');
        console.log(result);
        // imprime el resultado
    }).catch(error => {
        console.error('Error al ejecutar el archivo usuarios.sql:', error);
    });
}).catch(error => {
    console.error('No se pudo conectar a la base de datos.');
    process.exit(1); // Termina la aplicación si no se puede establecer la conexión a la base de datos
});