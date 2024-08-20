const { User } = require('../models/User');
const { PublicError } = require('../errors/PublicError');
const { JwtHelper } = require('../utils/JwtHelper');

class AuthController {
    constructor() {}

    static async Login(req, res, next) {
        // guarda en una variable los parametros del body dentro de un array

        const body_params = {
            email: req.body.email ? req.body.email : null,
            password: req.body.password ? req.body.password : null
        }

        try {
            // Obtiene todos los usuarios
            const users = await User.GetAll(body_params);
            if (users instanceof User){
                const isValid = JwtHelper.ValidPassword(body_params.password, users.hash, users.salt);
                if (isValid) {
                    const userWithoutHashSalt = {
                        nombre: users.nombre,
                        email: users.email,
                        rol: users.rol,
                        deleted_at: users.deleted_at,
                        id: users.id
                    };
                    const tokenObject = JwtHelper.IssueJWT(userWithoutHashSalt);
                    
                    res.status(200).json({ 
                        message: 'User logged in successfully', 
                        token: tokenObject.token, 
                        expiresIn: tokenObject.expires 
                    });
                }
                else throw new PublicError('Invalid password', null, 401);
            }
            else throw new PublicError('User not found', null, 404);            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { AuthController };