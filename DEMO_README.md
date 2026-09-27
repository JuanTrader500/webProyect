#  Guía de la Demo de Validación

Este documento describe cómo ejecutar la demo técnica para validar que la base de datos, los modelos y la persistencia de datos están funcionando correctamente en el proyecto.

##  ¿En qué consiste la Demo?

Se ha implementado un script autónomo en `src/app_demo.js` que no requiere de un servidor Express activo. El script automatiza el siguiente flujo de datos:

1. **Crea un Rol** $\rightarrow$ **Crea un Usuario** (con contraseña hasheada mediante `bcryptjs`) $\rightarrow$ **Crea un Proyecto** $\rightarrow$ **Asocia el Usuario al Proyecto**.
2. **Valida la Integridad**: Realiza una consulta compleja utilizando `JOIN` para confirmar que todas las tablas están relacionadas correctamente.

---

## 🏃 Paso a Paso para Ejecutar la Demo

### 1. Levantar la Infraestructura (Docker)
Asegúrate de que el contenedor de PostgreSQL esté activo:
```bash
docker-compose up -d postgres_db
```

### 2. Ejecutar el Script de Validación
Desde la raíz del proyecto, ejecuta el siguiente comando:
```bash
node src/app_demo.js
```

**¿Qué debe suceder?**
- La terminal mostrará la creación de cada registro en tiempo real.
- Al finalizar, se desplegará una **tabla de resultados** que une la información de Usuario, Rol y Proyecto. Si la tabla contiene datos, la integración código-BD es exitosa.

### 3. Prueba de Persistencia (Volúmenes de Docker)
Para verificar que los datos no se pierden al reiniciar el servidor:
1. Reinicia el contenedor de la base de datos:
   ```bash
   docker-compose restart postgres_db
   ```
2. Ejecuta el script nuevamente:
   ```bash
   node src/app_demo.js
   ```
   *Aunque el script crea nuevos registros, puedes entrar a **pgAdmin** y comprobar que los datos de las ejecuciones anteriores permanecen intactos gracias al volumen `postgres_data`.*

---

##  Verificación Manual (SQL)

Si deseas validar los resultados directamente en **pgAdmin**, disponemos de consultas predefinidas en:
`database/ejemplos_sql/`

**Archivos disponibles:**
- `consultas_usuarios.sql`: Relación Usuarios $\leftrightarrow$ Roles.
- `consultas_proyectos.sql`: Relación Usuarios $\leftrightarrow$ Proyectos.
- `consultas_permisos.sql`: Relación Roles $\leftrightarrow$ Permisos.

**Instrucciones para pgAdmin:**
1. Abre la herramienta **Query Tool** de la base de datos `psql_db_web_proyect`.
2. Copia el contenido de cualquiera de los archivos `.sql` mencionados.
3. Ejecuta la consulta presionando **F5**.
