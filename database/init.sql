-- Tabla para los roles del sistema (ej: Admin, User)
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de usuarios con autoreferencia para el administrador responsable
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol_id INTEGER NOT NULL REFERENCES roles(id),
    administrador_id INTEGER REFERENCES usuarios(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de proyectos, cada uno debe tener un usuario responsable
CREATE TABLE IF NOT EXISTS proyectos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    administrador_id INTEGER NOT NULL REFERENCES usuarios(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla intermedia para la relación muchos a muchos entre usuarios y proyectos
CREATE TABLE IF NOT EXISTS usuarios_proyectos (
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    proyecto_id INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, proyecto_id)
);

-- Catálogo de permisos disponibles en la aplicación
CREATE TABLE IF NOT EXISTS permisos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- Tabla intermedia para asignar permisos a los roles
CREATE TABLE IF NOT EXISTS roles_permisos (
    rol_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permiso_id INTEGER NOT NULL REFERENCES permisos(id) ON DELETE CASCADE,
    PRIMARY KEY (rol_id, permiso_id)
);

-- Datos semilla mínimos para poder probar el sistema desde el día uno
INSERT INTO roles (nombre) VALUES ('Administrador'), ('Usuario')
    ON CONFLICT (nombre) DO NOTHING;
