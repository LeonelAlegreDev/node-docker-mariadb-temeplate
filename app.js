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
const pool = require('./config/mariadb')
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
// dbConnect();

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Servidor Node.js escuchando en http://${HOST}:${PORT}`);
});