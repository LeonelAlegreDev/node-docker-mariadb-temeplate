// Load environment variables from .env file
require('dotenv').config()

// Importing modules
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { dbConnect } = require('./config/mariadb');
const { PublicError } = require('./errors/PublicError');
const { ErrorMiddleware } = require('./middlewares/ErrorMiddleware');

// Constants for the server configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Create express app
const app = express();

// Desplazamiento de un lugar a otro.

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
}).catch((error) => {
    if(error instanceof PublicError) {
        console.log(error.message);
    }
    else console.log("Error al conectar a la base de datos MariaDB");
    process.exit(1); // Termina la aplicación si no se puede establecer la conexión a la base de datos
});

// crea un middleware que maneje todos los errores
app.use(ErrorMiddleware.HandleError);