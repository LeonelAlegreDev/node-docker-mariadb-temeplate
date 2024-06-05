const epxress = require('express')
const router = epxress.Router()
const fs = require('fs')
const { indexController } = require('../controllers/index');

// Obtenemos la ruta del directorio actual donde se encuentra este archivo.
const pathRouter = `${__dirname}`

// Función para eliminar la extensión de un nombre de archivo.
const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

// Leemos el contenido del directorio actual y filtramos los archivos para cargar las rutas.
fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExt = removeExtension(file)
    const skip = ['index'].includes(fileWithOutExt)
    if (!skip) {
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`))
        console.log('CARGAR RUTA ---->', fileWithOutExt)
    }
})

// Ruta index
router.get('/', indexController);

// Ruta para manejar todas las demás solicitudes que no coincidan con ninguna ruta definida.
router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

module.exports = router