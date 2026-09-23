// Punto de entrada del servidor
require('./config/dotenv'); // Cargar .env primero
const connectDB = require('./config/database');
const app = require('./app');

const port = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port);
});
