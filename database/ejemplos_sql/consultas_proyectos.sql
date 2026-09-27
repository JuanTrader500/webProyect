-- ===============================================================================
-- CONSULTAS PARA VERIFICAR PROYECTOS Y ASIGNACIONES
-- ===============================================================================

-- 1. Listar proyectos y quién es el administrador responsable
SELECT p.nombre as proyecto, u.nombre as administrador
FROM proyectos p
JOIN usuarios u ON p.administrador_id = u.id;

-- 2. Listar todos los usuarios que participan en un proyecto específico (por ID)
-- Reemplazar '1' por el ID del proyecto
SELECT u.nombre, u.email
FROM usuarios u
JOIN usuarios_proyectos up ON u.id = up.usuario_id
WHERE up.proyecto_id = 1;

-- 3. Ver qué proyectos tiene asignados un usuario específico (por ID)
-- Reemplazar '1' por el ID del usuario
SELECT p.nombre
FROM proyectos p
JOIN usuarios_proyectos up ON p.id = up.proyecto_id
WHERE up.usuario_id = 1;
