const pool = require('../config/database');

const Project = {
    // Busco un proyecto por id
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM proyectos WHERE id = $1', [id]);
        return rows[0];
    },

    // Creo un proyecto, el administrador_id es obligatorio según la BD
    create: async ({ nombre, administrador_id }) => {
        const { rows } = await pool.query(
            'INSERT INTO proyectos (nombre, administrador_id) VALUES ($1, $2) RETURNING *',
            [nombre, administrador_id]
        );
        return rows[0];
    },

    // Traigo todos los proyectos
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM proyectos ORDER BY nombre ASC');
        return rows;
    },

    // Actualizo nombre o administrador
    update: async (id, data) => {
        const fields = Object.keys(data).map((key, index) => `${key} = $${index + 2}`).join(', ');
        const values = Object.values(data);

        const { rows } = await pool.query(
            `UPDATE proyectos SET ${fields} WHERE id = $1 RETURNING *`,
            [id, ...values]
        );
        return rows[0];
    }
};

module.exports = Project;
