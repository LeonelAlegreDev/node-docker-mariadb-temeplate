// importar PublicError.js
const { PublicError } = require('../errors/PublicError.js');
const { pool } = require('../config/mariadb.js');

class User {
    constructor(nombre, email, rol, hash, salt) {
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.hash = hash ? hash : null;
        this.salt = salt ? salt : null;
        this.deleted_at = null;
        this.id = null;
        this.ValidarCampos();
    }
  
    static async Create(user) {
        // valida que el user no sea null y sea un objeto del tipo User
        if (user !== null && user instanceof User) {
            //genera la consulta para insertar un nuevo usuario
            const query = 'INSERT INTO users (nombre, email, rol, hash, salt) VALUES (?, ?, ?, ?, ?)';

            try {
                //ejecuta la consulta y retorna el id del usuario creado
                const result = await pool.query(query, [user.nombre, user.email, user.rol, user.hash, user.salt]);            
                return result.insertId.toString();
            } catch (error) {
                // valida si el error es de duplicidad de email
                if(error.code === 'ER_DUP_ENTRY'){
                    throw new PublicError('Email already exists',null, 409);
                }
                else throw error;
            }
        }
        else throw new PublicError('User is required');    
    }

    static async GetAll(query_params) {
        let query = "SELECT *, DATE_FORMAT(deleted_at, '%d-%m-%Y %H:%i:%s') d_at FROM users";
        const params = [];
        let where_added = false;


        if(query_params && query_params.email !== null){
            const condition = where_added ? " AND " : " WHERE ";
            query = query + condition + "email = ?";
            params.push(query_params.email);
            where_added = true;
        }
        if(query_params && query_params.deleted !== null){
            const condition = where_added ? " AND " : " WHERE ";
            query = query + condition + "deleted_at IS " + (query_params.deleted === 'true' ? "NOT " : "") + "NULL";
            where_added = true;
        }

        const rows = await pool.query(query, params);

        if (rows.length > 0) {
            // Transforma los registros en un array de objetos
            const users = rows.map(row => {
                const user = new User(row.nombre, row.email, row.rol, row.hash, row.salt);
                user.id = row.id;
                user.deleted_at = row.d_at;
                
                return user;
            });
            if(users.length === 1) return users[0];
            return users;
        }
        else throw new PublicError('No users found', null, 404);
    }
  
    static async GetById(id, query_params) {
        let query = "SELECT *, DATE_FORMAT(deleted_at, '%d-%m-%Y %H:%i:%s') d_at FROM users WHERE id = ?";
        
        if(query_params && query_params.deleted !== null){
            query = query + " AND deleted_at IS " + (query_params.deleted === 'true' ? "NOT " : "") + "NULL";
        }
        
        const result = await pool.query(query, id);

        // Valida el resultado de la consulta
        if (result.length > 0) {
            const user = new User(result[0].nombre, result[0].email, result[0].rol, result[0].hash, result[0].salt);
            user.id = result[0].id;
            user.deleted_at = result[0].d_at;

            return user;
        }
        else throw new PublicError('User not found', null, 404);
    }
    
    static async Update(id, user) {
        // valida que el user no sea null y sea un objeto del tipo User
        if (user !== null && user instanceof User) {
            try {
                //genera la consulta para actualizar el usuario
                const query = 'UPDATE users SET nombre = ?, email = ?, rol = ?, hash = ?, salt = ? WHERE id = ?';
                const result = await pool.query(query, [user.nombre, user.email, user.rol, user.hash, user.salt, id]);
            
                return result.affectedRows === 1;
            } catch (error) {
                // valida si el error es de duplicidad de email
                if(error.code === 'ER_DUP_ENTRY'){
                    throw new PublicError('Email already exists',null, 409);
                }
                else throw error;
            }
        }
        else throw new PublicError('User is required', null, 400);   
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