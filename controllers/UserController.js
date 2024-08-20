const { User } = require('../models/User');
const { PublicError } = require('../errors/PublicError');
const { JwtHelper } = require('../utils/JwtHelper');

class UserController {
    constructor() {}
  
    static async Create(req, res, next) {
        // Captura los parámetros del cuerpo de la petición con los datos del user
        const nombre = req.body.nombre ? req.body.nombre : null;  
        const password = req.body.password ? req.body.password : null;
        const email = req.body.email ? req.body.email : null;
        const rol = req.body.rol ? req.body.rol : null;      

        // valida que los campos parametros no sean nulos
        if(nombre !== null && password !== null && email !== null && rol !== null){
            try {
                //
                const {salt, hash} = JwtHelper.GenPassword(password);
                const user = new User(nombre, email, rol, hash, salt);
                const result = await User.Create(user);

                if(parseInt(result) > 0){
                    res.status(201).json({ 
                        message: 'User created successfully', 
                        id: result 
                    });
                }
                else throw new PublicError('Error creating user');
            }
            catch (error) {
                next(error);
            }
        }
        else res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    static async GetAll(req, res, next) {
        // guarda en una variable los parametros de la query dentro de un array
        const query_params = {
            email: req.query.email ? req.query.email : null,
            deleted: req.query.deleted ? req.query.deleted : false
        }   
        try {
            // Obtiene todos los usuarios
            const users = await User.GetAll(query_params);
            let usersWithoutHashSalt = null;

            if (Array.isArray(users)){
                // Mapea los usuarios a un array de objetos sin los campos hash y salt
                usersWithoutHashSalt = users.map(({ nombre, email, rol, deleted_at, id }) => ({
                    nombre,
                    email,
                    rol,
                    deleted_at,
                    id
                }));
            }
            else{
                usersWithoutHashSalt = {
                    nombre: users.nombre,
                    email: users.email,
                    rol: users.rol,
                    deleted_at: users.deleted_at,
                    id: users.id
                };
            }           
            res.status(200).json(usersWithoutHashSalt);
        } catch (error) {
            next(error);
        }
    }

    static async GetById(req, res, next) {
        // Captura el id del usuario a buscar
        const id = req.params.id ? req.params.id : null;
        const query_params = {
            deleted: req.query.deleted ? req.query.deleted : false
        }
        try {
            // Obtiene el usuario por ID
            const user = await User.GetById(id, query_params);

            const userWithoutHashSalt = {
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                deleted_at: user.deleted_at,
                id: user.id
            }
            res.status(200).json(userWithoutHashSalt);
        } catch (error) {
            next(error);
        }
    }

    static async Update(req, res, next) {
        // Captura los parametros de la peticion en un array
        const params = {
            id: req.params.id ? req.params.id : null,
            nombre: req.body.nombre ? req.body.nombre : null,
            contrasena: req.body.contrasena ? req.body.contrasena : null,
            email: req.body.email ? req.body.email : null,
            rol: req.body.rol ? req.body.rol : null
        }
        // Valida que se hayan enviado atributos para modificar
        if(params.nombre === null && params.contrasena === null && params.email === null && params.rol === null){
            res.status(400).json({ message: 'At least one parameter is required' });
            return;
        }

        try {
            // Obtiene el usuario por ID
            const user = await User.GetById(params.id);

            // Valida si el usuario fue eliminado previamente
            if(user.deleted_at !== null){
                throw new PublicError('User not found', null, 404);
            }

            // Actualiza los valores del usuario con los valores capturados si no son null usando el operador ternario
            user.nombre = params.nombre ? params.nombre : user.nombre;
            user.email = params.email ? params.email : user.email;
            user.rol = params.rol ? params.rol : user.rol;

            if(params.contrasena){
                const {salt, hash} = JwtHelper.GenPassword(params.contrasena);
                user.salt = salt;
                user.hash = hash;
            }
            // Valida los atributos del usuario
            user.ValidarCampos();

            // Actualiza el usuario con el id especificado
            const result = await User.Update(params.id, user);

            if(result){
                res.status(200).json({ message: 'User updated successfully' });
            }
            else throw new PublicError('Error updating user');
        } catch (error) {
            next(error);
        }
    }

    static async Delete(req, res, next) {
        // Captura el id del usuario a eliminar 
        const id = req.params.id ? req.params.id : null;

        try{
            const user = await User.GetById(id);

            // Valida si el usuario fue eliminado previamente
            if(user.deleted_at !== null){
                throw new PublicError('User not found', null, 404);
            }

            // Elimina el usuario con el id especificado
            const result = await User.Delete(id);

            if(result){
                res.status(200).json({ message: 'User deleted successfully' });
            }
            else throw new PublicError('Error deleting user');
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = { UserController };