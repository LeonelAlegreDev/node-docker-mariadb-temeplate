const indexController = (req, res) => {
    const data = {
      pageTitle: 'Página de Inicio',
      welcomeMessage: 'Bienvenido a nuestra aplicación con SSR!'
    };
    res.status(200).json(data); // Send a JSON response
};

module.exports = { indexController };