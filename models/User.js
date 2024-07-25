// importar PublicError.js
const { PublicError } = require('../errors/PublicError.js');
const { pool } = require('../config/mariadb.js');

class User {
    constructor(nombre, contrasena, email, rol) {
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.email = email;
        this.rol = rol;
        this.deleted_at = null;
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
        const query = "SELECT *, DATE_FORMAT(deleted_at, '%d-%m-%Y %H:%i:%s') AS da_format FROM users;";
        const rows = await pool.query(query);
    
        if (rows.length > 0) {
            // Transforma los registros en un array de objetos
            const users = rows.map(row => {
                const user = new User(row.nombre, row.contrasena, row.email, row.rol);
                user.deleted_at = row.da_format;
                
                return user;
            });
            return users;
        }
        else throw new PublicError('No users found');
    }
  
    static async GetById(id) {
        const query = "SELECT *, DATE_FORMAT(deleted_at, '%d-%m-%Y %H:%i:%s') AS da_format FROM users WHERE id = ?";
        const result = await pool.query(query, id);

        // Valida el resultado de la consulta
        if (result.length > 0) {
            const user = new User(result[0].nombre, result[0].contrasena, result[0].email, result[0].rol);
            user.deleted_at = result[0].da_format;
            
            return user;
        }
        else throw new PublicError('User not found');
    }
    
    static async Update(id, user) {
        // valida que el user no sea null y sea un objeto del tipo User
        if (user !== null && user instanceof User) {
            //genera la consulta para actualizar el usuario
            const query = 'UPDATE users SET nombre = ?, contrasena = ?, email = ?, rol = ? WHERE id = ?';
            const result = await pool.query(query, [user.nombre, user.contrasena, user.email, user.rol, id]);    
            
            return result.affectedRows === 1;
        }
        else throw new PublicError('User is required');    
    }
  
    static async Delete(id) {
        // Genera la consulta para eliminar el usuario
        const query = 'Update users SET deleted_at = NOW() WHERE id = ?';
        const result = await pool.query(query, [id]);

        return result.affectedRows === 1;
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