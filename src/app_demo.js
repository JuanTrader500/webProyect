const pool = require('./config/database');
const Role = require('./models/role.model');
const User = require('./models/user.model');
const Project = require('./models/project.model');
const UserProject = require('./models/userProject.model');

async function runDemo() {
    console.log('--- 🚀 INICIANDO DEMO DE VALIDACIÓN ---\n');

    try {
        // 1. Crear un Rol personalizado
        console.log('1. Creando Rol "Supervisor"...');
        const role = await Role.create('Supervisor');
        console.log('✅ Rol creado:', role);

        // 2. Crear un Usuario asociado a ese rol
        console.log('\n2. Creando Usuario "Demo User"...');
        const user = await User.create({
            nombre: 'Demo User',
            email: `demo_${Date.now()}@example.com`,
            password: 'password123',
            rol_id: role.id,
            administrador_id: null
        });
        console.log('✅ Usuario creado (Contraseña hasheada en BD):', user);

        // 3. Crear un Proyecto
        console.log('\n3. Creando Proyecto "Proyecto Demo"...');
        const project = await Project.create({
            nombre: 'Proyecto Demo Alpha',
            administrador_id: user.id
        });
        console.log('✅ Proyecto creado:', project);

        // 4. Vincular Usuario al Proyecto
        console.log('\n4. Vinculando Usuario al Proyecto...');
        await UserProject.assign(user.id, project.id);
        console.log('✅ Vínculo creado correctamente.');

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
            console.log('✅ TODO CORRECTO. Resultado de la consulta:');
            console.table(rows);
        } else {
            console.log('❌ Error: No se encontraron los datos vinculados.');
        }

    } catch (error) {
        console.error('\n❌ ERROR DURANTE LA DEMO:', error.message);
        if (error.detail) console.error('Detalle:', error.detail);
    } finally {
        console.log('\n--- 🏁 DEMO FINALIZADA ---');
        console.log('💡 TIP: Ahora puedes reiniciar tu contenedor de Docker y ejecutar este script nuevamente');
        console.log('o usar un script de verificación para comprobar la permanencia de los datos.');
        await pool.end();
    }
}

runDemo();
