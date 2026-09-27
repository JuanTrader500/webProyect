-- ===============================================================================
-- CONSULTAS PARA VERIFICAR PERMISOS Y ROLES
-- ===============================================================================

-- 1. Ver todos los permisos asignados a un rol específico (ej: 'Administrador')
SELECT p.nombre as permiso, p.descripcion
FROM permisos p
JOIN roles_permisos rp ON p.id = rp.permiso_id
JOIN roles r ON rp.rol_id = r.id
WHERE r.nombre = 'Administrador';

-- 2. Buscar qué roles tienen un permiso específico (ej: 'crear_usuario')
SELECT r.nombre as rol
FROM roles r
JOIN roles_permisos rp ON r.id = rp.rol_id
JOIN permisos p ON rp.permiso_id = p.id
WHERE p.nombre = 'crear_usuario';

-- 3. Listar todos los permisos y cuántos roles los poseen
SELECT p.nombre, COUNT(rp.rol_id) as cantidad_roles
FROM permisos p
LEFT JOIN roles_permisos rp ON p.id = rp.permiso_id
GROUP BY p.nombre;
