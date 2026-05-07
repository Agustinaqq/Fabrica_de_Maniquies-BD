# Gestión de Fábrica de Maniquíes

Este repositorio contiene el sistema de base de datos para la gestión de piezas, materiales y ensamblaje de maniquíes. El proyecto incluye la definición de la estructura (DDL) y la carga inicial de datos (DML).

## Estructura del Proyecto

El proyecto está organizado en la carpeta `/sentencias-sql`:

* **`creates.sql`**: Contiene la creación de la base de datos y de las 5 tablas principales (`tipos_pieza`, `materiales`, `colores`, `maniquies` y `piezas`).
* **`inserts.sql`**: Contiene la carga de los catálogos y el ensamblaje de los 5 maniquíes de prueba (con sus 40 piezas correspondientes).

##  Instrucciones de Ejecución

Para montar la base de datos correctamente, siga estos pasos en su cliente SQL (DBeaver, MySQL Workbench, etc.):

1. **Ejecutar `creates.sql`**: Este script debe correrse primero, ya que crea la estructura y las llaves foráneas.
2. **Ejecutar `inserts.sql`**: Una vez creadas las tablas, ejecute este script para poblar la base de datos.

> **Importante:** Asegúrese de que el servidor MySQL esté activo (vía XAMPP u otro servicio) antes de intentar la conexión.

##  Tecnologías Utilizadas
* **Motor de Base de Datos:** MySQL
* **Gestor de BD:** DBeaver
* **Editor:** Visual Studio Code
* **Control de Versiones:** Git / GitHub