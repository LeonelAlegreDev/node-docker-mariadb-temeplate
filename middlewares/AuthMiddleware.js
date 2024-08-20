const fs = require('fs');
const path = require('path');
const jsonwebtoken = require('jsonwebtoken');
const { PublicError } = require('../errors/PublicError');
const { User } = require('../models/User');

class AuthMiddleware {
    constructor() {}

    static ValidateJwtToken(req, res, next) {
        const tokenParts = req.headers.authorization.split(' ');
        const pathToKey = path.join(__dirname, '../config/', 'id_rsa_pub.pem');
        const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

        // Valida que el token tenga el formato correcto
        if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
            try {
                // Verifica la firma del token
                const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, { algorithms: ['RS256'] });
                req.jwt = verification;
                next();
            } catch (error) {
                let res_error;
                switch (error.name) {
                    case 'TokenExpiredError':
                        res_error = new PublicError('Token has expired', null, 401);
                        break;
                    case 'JsonWebTokenError':
                        // TODO: Implementar logs sobre potenciales intentos de ataque
                        
                        // More specific error handling based on error details
                        if (error.message.includes('invalid signature')) {
                            res_error = new PublicError('Invalid token signature', null, 401);
                        } else if (error.message.includes('invalid audience')) {
                            res_error = new PublicError('Forbidden', null, 403);
                        } else if (error.message.includes('invalid issuer')) {
                            res_error = new PublicError('Forbidden', null, 403);
                        } else if (error.message.includes('must be an asymmetric key')) {
                            res_error = new PublicError('Invalid token', null, 401);
                        } else {
                            res_error = new PublicError('Invalid token', null, 401);
                        }
                        break;
                    default:
                        res_error = new PublicError('Invalid token', null, 401);
                        break;
                }
                next(res_error);
            }
        } else {
            next(new PublicError('Invalid token', null, 401));
        }
    }

    static async ValidateOwner(req, res, next) {
        const id_param = req.query.owner ? req.query.owner : null;
        const id_jwt = req.jwt.sub ? req.jwt.sub : null;
        
        if(id_param !== null && id_jwt !== null) {
            try {
                const user = await User.GetById(id_param);
                if (user.id === id_jwt) {
                    next();
                } else {
                    throw new PublicError('Unauthorized', null, 401);
                }
            } catch (error) {
                next(error);
            }
        }
        else next(new PublicError('Unauthorized', null, 401));
    }

    static async ValidateAdmin(req, res, next) {
        const id_jwt = req.jwt.sub ? req.jwt.sub : null;
        
        if(id_jwt !== null) {
            try {
                const user = await User.GetById(id_jwt);
                if (user.rol === 'admin') {
                    next();
                } else {
                    throw new PublicError('Forbidden', null, 403);
                }
            } catch (error) {
                next(error);
            }
        }
        else next(new PublicError('Unauthorized', null, 401));
    }

    // TODO: Reemplazar la implementacion anterior
}

module.exports = { AuthMiddleware };