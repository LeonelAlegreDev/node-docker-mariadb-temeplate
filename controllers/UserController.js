const { User } = require('../models/User');
const { PublicError } = require('../errors/PublicError');
const { ErrorCatcher } = require('../errors/ErrorCatcher');

class UserController {
    constructor() {}
  
    static async Create(req, res) {
        // Captura los parámetros del cuerpo de la petición con los datos del user
        const nombre = req.body.nombre ? req.body.nombre : null;  
        const contrasena = req.body.contrasena ? req.body.contrasena : null;
        const email = req.body.email ? req.body.email : null;
        const rol = req.body.rol ? req.body.rol : null;      

        // valida que los campos parametros no sean nulos
        if(nombre !== null && contrasena !== null && email !== null && rol !== null){
            try {
                const user = new User(nombre, contrasena, email, rol);
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
                ErrorCatcher.CatchError(error, res);    
            }
        }
        else res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    static async GetAll(req, res) {
        try {
            // Obtiene todos los usuarios
            const users = await User.GetAll();
            res.status(200).json(users);
        } catch (error) {
            ErrorCatcher.CatchError(error, res);
        }
    }

    static async GetById(req, res) {
        // Captura el id del usuario a buscar
        const id = req.params.id ? req.params.id : null;
        try {
            // Obtiene el usuario por ID
            const user = await User.GetById(id);
            res.status(200).json(user);
        } catch (error) {
            ErrorCatcher.CatchError(error, res);
        }
    }
    
    static async Update(req, res) {
        // Implementar la lógica para actualizar un cliente (PUT)

        // Captura los parametros de la siguiente peticion en variables del mismo nombre y si no se envian se igualan a null
        const id = req.params.id ? req.params.id : null;
        const nombre = req.body.nombre ? req.body.nombre : null;
        const contrasena = req.body.contrasena ? req.body.contrasena : null;
        const email = req.body.email ? req.body.email : null;
        const rol = req.body.rol ? req.body.rol : null;

        try {
            // Obtiene el usuario por ID
            const user = await User.GetById(id);

            // Actualiza los valores del usuario con los valores capturados si no son null usando el operador ternario
            user.nombre = nombre ? nombre : user.nombre;
            user.contrasena = contrasena ? contrasena : user.contrasena;
            user.email = email ? email : user.email;
            user.rol = rol ? rol : user.rol;

            // Valida los atributos del usuario
            user.ValidarCampos();

            // Actualiza el usuario con el id especificado
            const result = await User.Update(id, user);

            if(result){
                res.status(200).json({ message: 'User updated successfully' });
            }
            else throw new PublicError('Error updating user');
        } catch (error) {
            ErrorCatcher.CatchError(error, res);
        }
    }
  
  // ... (métodos para otras peticiones)
}

module.exports = { UserController };