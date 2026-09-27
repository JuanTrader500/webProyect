const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
    // Busco usuario por id
    findById: async (id) => {
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        return rows[0];
    },

    // Busco por email porque es el campo que uso para el login
    findByEmail: async (email) => {
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return rows[0];
    },

    // Creo el usuario, pero primero hasheo la password con bcrypt
    create: async ({ nombre, email, password, rol_id, administrador_id }) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { rows } = await pool.query(
            'INSERT INTO usuarios (nombre, email, password, rol_id, administrador_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, email, hashedPassword, rol_id, administrador_id]
        );
        return rows[0];
    },

    // Actualizo datos del usuario
    update: async (id, data) => {
        const fields = Object.keys(data).map((key, index) => `${key} = $${index + 2}`).join(', ');
        const values = Object.values(data);

        const { rows } = await pool.query(
            `UPDATE usuarios SET ${fields} WHERE id = $1 RETURNING *`,
            [id, ...values]
        );
        return rows[0];
    },

    // Borro el usuario
    delete: async (id) => {
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        return { deleted: true };
    }
};

module.exports = User;
