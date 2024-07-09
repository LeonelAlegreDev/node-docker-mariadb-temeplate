const { User } = require('../models/User');
const { PublicError } = require('../errors/PublicError');

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
                if (error instanceof PublicError) {
                    res.status(400).json({ message: error.message , data: error.data});
                }
                else res.status(500).json({ message: 'Internal server error' });
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
            if (error instanceof PublicError) {
                res.status(400).json({ message: error.message , data: error.data});
            }
            else res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async UpdateClient(req, res) {
        // Implementar la lógica para actualizar un cliente (PUT)
    }
  
  // ... (métodos para otras peticiones)
}

module.exports = { UserController };