const epxress = require('express')
const router = epxress.Router()
const { UserController } = require('../controllers/UserController.js');

// Ruta GET All Users
router.get('/', UserController.GetAll);

// Ruta POST User
router.post('/', UserController.Create);

// Ruta GET User by ID
router.get('/:id', UserController.GetById);

// Ruta PUT User
router.put('/:id', UserController.Update);

// Ruta DELETE User by ID
router.delete('/:id', UserController.Delete);
module.exports = router;