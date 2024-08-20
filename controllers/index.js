const indexController = (req, res) => {
  const data = {
    pageTitle: 'Página de Inicio',
    welcomeMessage: '¡Bienvenido a la página de inicio de la API!',
  };
  res.status(200).json(data); // Send a JSON response
};

module.exports = { indexController };