// importar PublicError.js
const { PublicError } = require('../errors/PublicError.js');
const { pool } = require('../config/mariadb.js');

class User {
    constructor(nombre, contrasena, email, rol) {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.email = email;
        this.rol = rol;
        this.ValidarCampos();
    }
  
    static async Create(user) {
        // valida que el user no sea null y sea un objeto del tipo User
        if (user !== null && user instanceof User) {
            //genera la consulta para insertar un nuevo usuario
            const query = 'INSERT INTO users (nombre, contrasena, email, rol) VALUES (?, ?, ?, ?)';

            //ejecuta la consulta y retorna el id del usuario creado
            const result = await pool.query(query, [user.nombre, user.contrasena, user.email, user.rol]);
            
            return result.insertId.toString();
        }
        else throw new PublicError('User is required');    
    }

    static async GetAll() {
        const query = 'SELECT * FROM users;';
        const rows = await pool.query(query);
    
        if (rows.length > 0) {
            // Transforma los registros en un array de objetos
            const users = rows.map(row => {
                return {
                    id: row.id,
                    nombre: row.nombre,
                    contrasena: row.contrasena,
                    email: row.email,
                    rol: row.rol
                };
            });
            return users;
        }
        else throw new PublicError('No users found');
    }
  
    static async getById(id) {
    //   const query = 'SELECT * FROM clients WHERE id = ?';
    //   const [rows] = await pool.query(query, [id]);
    //   if (rows.length === 0) {
    //     return null;
    //   }
    //   const row = rows[0];
    //   return new Client(row.id, row.nombre_aplicacion, row.url_redireccionamiento, row.url_aplicacion, row.descripcion, row.icono, row.url_politica_privacidad, row.contacto);
    }
    
    static async update(id, client) {
    //   const query = 'UPDATE clients SET nombre_aplicacion = ?, url_redireccionamiento = ?, url_aplicacion = ?, descripcion = ?, icono = ?, url_politica_privacidad = ?, contacto = ? WHERE id = ?';
    //   await pool.query(query, [client.nombreAplicacion, client.urlRedireccionamiento, client.urlAplicacion, client.descripcion, client.icono, client.urlPoliticaPrivacidad, client.contacto, id]);
    //   return this.getById(id);
    }
  
    static async delete(id) {
    //   const query = 'DELETE FROM clients WHERE id = ?';
    //   await pool.query(query, [id]);
    }

    ValidarCampos(){
        // valida que todos los metodos del construct no sean nullos
        if(this.nombre === null || this.contrasena === null || this.email === null || this.rol === null){
            throw new PublicError('User properties cannot be null');
        }

        // valida que todos los metodos del construct no sean vacios
        if(this.nombre === '' || this.contrasena === '' || this.email === '' || this.rol === ''){
            throw new PublicError('User properties cannot be empty');
        }

        // valida que el email sea valido (contenga SOLO una @)
        if(this.email.split('@').length !== 2){
            throw new PublicError('Email is invalid');
        }
    }
}

module.exports = { User };