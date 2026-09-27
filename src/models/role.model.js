const pool = require('../config/database');

const Role = {
    // Busco un rol por su id
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
        return rows[0];
    },

    // Busco un rol por su nombre, ya que es UNIQUE
    findByNombre: async (nombre) => {
        const { rows } = await pool.query('SELECT * FROM roles WHERE nombre = $1', [nombre]);
        return rows[0];
    },

    // Creo un nuevo rol
    create: async (nombre) => {
        const { rows } = await pool.query(
            'INSERT INTO roles (nombre) VALUES ($1) RETURNING *',
            [nombre]
        );
        return rows[0];
    },

    // Traigo todos los roles
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM roles ORDER BY nombre ASC');
        return rows;
    }
};

module.exports = Role;
