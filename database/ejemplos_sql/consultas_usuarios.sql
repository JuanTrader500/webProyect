-- ===============================================================================
-- CONSULTAS PARA VERIFICAR USUARIOS Y ROLES
-- ===============================================================================

-- 1. Listar todos los usuarios con el nombre de su rol
SELECT u.id, u.nombre, u.email, r.nombre as rol
FROM usuarios u
JOIN roles r ON u.rol_id = r.id;

-- 2. Buscar usuarios que tengan un administrador asignado
SELECT u.nombre as usuario, adm.nombre as administrador
FROM usuarios u
JOIN usuarios usuarios_adm ON u.administrador_id = usuarios_adm.id
JOIN usuarios adm ON usuarios_adm.id = adm.id;

-- 3. Contar cuántos usuarios hay por cada rol
SELECT r.nombre, COUNT(u.id) as total_usuarios
FROM roles r
LEFT JOIN usuarios u ON r.id = u.rol_id
GROUP BY r.nombre;
