# webProyect - Gestión de Usuarios y Proyectos

## Estado actual / Implementado hasta el momento

### Modelo de Base de Datos
Se implementó un esquema de base de datos relacional en PostgreSQL con las siguientes 6 tablas:
- `roles`: Catálogo de roles del sistema (ej. Administrador, Usuario).
- `usuarios`: Información de los usuarios, incluyendo su rol y un administrador responsable opcional.
- `proyectos`: Registro de proyectos y el administrador responsable de cada uno.
- `usuarios_proyectos`: Tabla intermedia para gestionar la participación de múltiples usuarios en múltiples proyectos.
- `permisos`: Catálogo de acciones y capacidades disponibles en el sistema.
- `roles_permisos`: Tabla intermedia que asigna permisos específicos a cada rol.

### Modelos de JavaScript
Se crearon/actualizaron los siguientes modelos en `src/models/` siguiendo la convención `entidad.model.js`:
- `user.model.js`
- `role.model.js`
- `project.model.js`
- `userProject.model.js`
- `permission.model.js`
- `rolePermission.model.js`

### Medidas de Seguridad Aplicadas
- **Consultas Parametrizadas**: Se utiliza el driver `pg` con placeholders (`$1, $2...`) en todas las consultas para prevenir ataques de Inyección SQL.
- **Hash de Contraseñas**: Implementación de `bcryptjs` para almacenar contraseñas seguras en la tabla de usuarios.
- **Validación**: Estructura preparada para validación de datos antes de la persistencia en base de datos.

### Decisiones Técnicas y Pendientes
- **Configuración de DB**: Se migró la conexión de Mongoose (MongoDB) a `pg` (PostgreSQL) en `src/config/database.js` para coincidir con el nuevo modelado SQL.
- **Variables de Entorno**: El sistema depende de un archivo `.env` con las credenciales de Postgres (`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`).
