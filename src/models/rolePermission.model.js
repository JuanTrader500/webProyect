const pool = require('../config/database');

const RolePermission = {
    // Asigno un permiso a un rol
    assign: async (rol_id, permiso_id) => {
        const { rows } = await pool.query(
            'INSERT INTO roles_permisos (rol_id, permiso_id) VALUES ($1, $2) RETURNING *',
            [rol_id, permiso_id]
        );
        return rows[0];
    },

    // Quito un permiso de un rol
    unassign: async (rol_id, permiso_id) => {
        await pool.query('DELETE FROM roles_permisos WHERE rol_id = $1 AND permiso_id = $2', [rol_id, permiso_id]);
        return { success: true };
    },

    // Busco todos los permisos de un rol específico
    findByRoleId: async (rol_id) => {
        const { rows } = await pool.query(
            'SELECT p.* FROM permisos p JOIN roles_permisos rp ON p.id = rp.permiso_id WHERE rp.rol_id = $1',
            [rol_id]
        );
        return rows;
    }
};

module.exports = RolePermission;
