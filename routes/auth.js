const epxress = require('express')
const router = epxress.Router()
const { AuthController } = require('../controllers/AuthController.js');
const { AuthMiddleware } = require('../middlewares/AuthMiddleware.js');

// Ruta de inicio de sesion de usuario
router.post('/login', AuthController.Login);

// Valida que el token sea valido
router.get('/validate-token', AuthMiddleware.ValidateJwtToken, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// Valida que el propietario del token sea el mismo propietario del recurso
router.get('/validate-owner/', AuthMiddleware.ValidateJwtToken, AuthMiddleware.ValidateOwner, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You can access this route because you are the owner of the resource!"});
});

// Valida que el propietario del token sea el mismo propietario del recurso
router.get('/validate-admin/', AuthMiddleware.ValidateJwtToken, AuthMiddleware.ValidateAdmin, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You can access this route because you are an admin!"});
});
module.exports = router;