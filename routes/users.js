const epxress = require('express')
const router = epxress.Router()
const { UserController } = require('../controllers/UserController.js');

// Ruta GET User
router.get('/', UserController.GetAll);

// Ruta Post User
router.post('/', UserController.Create);

module.exports = router;