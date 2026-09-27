const pool = require('../config/database');

const UserProject = {
    // Asigno un usuario a un proyecto
    assign: async (usuario_id, proyecto_id) => {
        const { rows } = await pool.query(
            'INSERT INTO usuarios_proyectos (usuario_id, proyecto_id) VALUES ($1, $2) RETURNING *',
            [usuario_id, proyecto_id]
        );
        return rows[0];
    },

    // Quito a un usuario de un proyecto
    unassign: async (usuario_id, proyecto_id) => {
        await pool.query('DELETE FROM usuarios_proyectos WHERE usuario_id = $1 AND proyecto_id = $2', [usuario_id, proyecto_id]);
        return { success: true };
    },

    // Busco qué proyectos tiene un usuario
    findByUserId: async (usuario_id) => {
        const { rows } = await pool.query(
            'SELECT p.* FROM proyectos p JOIN usuarios_proyectos up ON p.id = up.proyecto_id WHERE up.usuario_id = $1',
            [usuario_id]
        );
        return rows;
    },

    // Busco qué usuarios están en un proyecto
    findByProjectId: async (proyecto_id) => {
        const { rows } = await pool.query(
            'SELECT u.* FROM usuarios u JOIN usuarios_proyectos up ON u.id = up.usuario_id WHERE up.proyecto_id = $1',
            [proyecto_id]
        );
        return rows;
    }
};

module.exports = UserProject;
