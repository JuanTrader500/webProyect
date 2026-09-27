const pool = require('./config/database');
const Role = require('./models/role.model');
const User = require('./models/user.model');
const Project = require('./models/project.model');
const UserProject = require('./models/userProject.model');

const DEMO_TAG = 'DEMO_VALIDATION_';

async function cleanupDemoData() {
    console.log('Limpiando datos de ejecuciones anteriores de la demo...');
    try {
        // Borramos en orden inverso a las FKs para evitar errores de integridad
        await pool.query('DELETE FROM usuarios_proyectos WHERE usuario_id IN (SELECT id FROM usuarios WHERE nombre LIKE $1)', [`${DEMO_TAG}%`]);
        await pool.query('DELETE FROM proyectos WHERE nombre LIKE $1', [`${DEMO_TAG}%`]);
        await pool.query('DELETE FROM usuarios WHERE nombre LIKE $1', [`${DEMO_TAG}%`]);
        await pool.query('DELETE FROM roles WHERE nombre LIKE $1', [`${DEMO_TAG}%`]);
        console.log('Limpieza completada exitosamente.');
    } catch (error) {
        console.error('Error durante la limpieza:', error.message);
    }
}

async function runDemo() {
    console.log('--- INICIANDO DEMO DE VALIDACIÓN ---\n');

    try {
        // 0. Limpieza inicial
        await cleanupDemoData();

        // 1. Crear un Rol personalizado
        const roleName = `${DEMO_TAG}Supervisor`;
        console.log(`\n1. Creando Rol "${roleName}"...`);
        
        // Intentamos buscar si ya existe (aunque la limpieza debería borrarlo)
        let role = await Role.findByNombre(roleName);
        if (!role) {
            role = await Role.create(roleName);
        }
        console.log('Rol listo:', role);

        // 2. Crear un Usuario asociado a ese rol
        const userName = `${DEMO_TAG}User_${Date.now()}`;
        console.log(`\n2. Creando Usuario "${userName}"...`);
        const user = await User.create({
            nombre: userName,
            email: `demo_${Date.now()}@example.com`,
            password: 'password123',
            rol_id: role.id,
            administrador_id: null
        });
        console.log('Usuario creado (Contraseña hasheada en BD):', user);

        // 3. Crear un Proyecto
        const projectName = `${DEMO_TAG}Project_${Date.now()}`;
        console.log(`\n3. Creando Proyecto "${projectName}"...`);
        const project = await Project.create({
            nombre: projectName,
            administrador_id: user.id
        });
        console.log('Proyecto creado:', project);

        // 4. Vincular Usuario al Proyecto
        console.log('\n4. Vinculando Usuario al Proyecto...');
        await UserProject.assign(user.id, project.id);
        console.log('Vínculo creado correctamente.');

        // 5. Validación Final con JOIN (Prueba de Integridad)
        console.log('\n5. Validando Integridad de Datos (JOIN)...');
        const query = `
            SELECT u.nombre as usuario, r.nombre as rol, p.nombre as proyecto
            FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            JOIN usuarios_proyectos up ON u.id = up.usuario_id
            JOIN proyectos p ON up.proyecto_id = p.id
            WHERE u.id = $1
        `;
        const { rows } = await pool.query(query, [user.id]);
        
        if (rows.length > 0) {
            console.log('TODO CORRECTO. Resultado de la consulta:');
            console.table(rows);
        } else {
            console.log('Error: No se encontraron los datos vinculados.');
        }

    } catch (error) {
        console.error('\nERROR DURANTE LA DEMO:', error.message);
        if (error.detail) console.error('Detalle:', error.detail);
    } finally {
        console.log('\n--- DEMO FINALIZADA ---');
        console.log('TIP: Puedes ejecutar este script múltiples veces; los datos anteriores se limpiarán automáticamente.');
        await pool.end();
    }
}

runDemo();
