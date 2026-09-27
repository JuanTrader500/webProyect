const { Pool } = require('pg');
const dotenv = require('dotenv');

// Cargo las variables de entorno para que el pool tenga los datos de conexión
dotenv.config();

// Creo el pool de conexión. Uso las variables que están en el .env
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
});

// Pruebo la conexión al iniciar para saber si hay errores de credenciales
pool.on('connect', () => {
    // Solo para debug, me avisa que una conexión se abrió con éxito
});

pool.on('error', (err) => {
    console.error('Error inesperado en el pool de Postgres', err);
});

module.exports = pool;
