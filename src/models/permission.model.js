const pool = require('../config/database');

const Permission = {
    // Busco permiso por id
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM permisos WHERE id = $1', [id]);
        return rows[0];
    },

    // Busco por nombre porque es UNIQUE
    findByNombre: async (nombre) => {
        const { rows } = await pool.query('SELECT * FROM permisos WHERE nombre = $1', [nombre]);
        return rows[0];
    },

    // Creo un permiso nuevo
    create: async ({ nombre, descripcion }) => {
        const { rows } = await pool.query(
            'INSERT INTO permisos (nombre, descripcion) VALUES ($1, $2) RETURNING *',
            [nombre, descripcion]
        );
        return rows[0];
    },

    // Traigo la lista de todos los permisos
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM permisos ORDER BY nombre ASC');
        return rows;
    }
};

module.exports = Permission;
