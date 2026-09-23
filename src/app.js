// Configuración principal de Express
const express = require('express');
const app = express();

// Middleware para JSON
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('API funcionando en mi-proyecto');
});

module.exports = app;
