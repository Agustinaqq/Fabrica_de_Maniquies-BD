# Gestión de Base de Datos de Fábrica de Maniquíes

Este repositorio contiene el sistema de base de datos para la gestión de piezas, materiales y ensamblaje de maniquíes. El proyecto incluye la definición de la estructura (DDL) y la carga inicial de datos (DML).
Luego se agrega la arquitectura y desarrollo de la aplicación.

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

## SQL Avanzado
Se incluyeron componentes para mejorar la performance y automatización del sistema:
* **Índices**: Optimización de búsquedas por modelo y fecha.
* **Stored Procedures**: Procedimiento `sp_insertar_pieza` para carga estandarizada.
* **Triggers**: Automatización del estado del maniquí al recibir nuevas piezas.
* **Transacciones**: Garantía de integridad en la creación de nuevos modelos.

## Arquitectura y Desarrollo de la Aplicación

El sistema fue escalado hacia una arquitectura full-stack desacoplada, separando la lógica del servidor de la interfaz de usuario para lograr un sistema robusto, modular y de alto rendimiento.

###  Backend (API REST con Express)
Se desarrolló un servidor web utilizando **Node.js** y **Express** que actúa como una API REST pura, conectada de forma segura a la base de datos MySQL a través de un pool de conexiones optimizado (`mysql2/promise`).

* **Middlewares Clave:**
    * `express.json()`: Para habilitar el procesamiento de datos en formato JSON en el cuerpo de las peticiones (`req.body`).
    * `cors`: Implementado para permitir peticiones HTTP cruzadas de forma segura desde el puerto del frontend.
* **Endpoints del CRUD (Entidad Principal: Maniquíes):**
    * `GET /maniquies`: Retorna la lista completa de maniquíes con un `LEFT JOIN` hacia la tabla `piezas` para agrupar dinámicamente materiales y colores.
    * `GET /maniquies/:id`: Busca y retorna un registro único filtrado por su ID.
    * `POST /maniquies`: Inserta un nuevo maniquí y su pieza inicial de manera atómica utilizando **Transacciones SQL (`BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`)**, garantizando la integridad de los datos.
    * `PUT /maniquies/:id`: Modifica los datos existentes de un maniquí específico.
    * `DELETE /maniquies/:id`: Elimina un maniquí por su ID, manejando de forma segura las excepciones de restricciones de claves foráneas (FK) de MySQL.

### Frontend (Single Page Application con React + Vite)
La interfaz de usuario fue migrada a **React** utilizando **Vite** como empaquetador de última generación para asegurar una carga ultrarrápida y una experiencia de usuario fluida.

* **Manejo de Estado (`useState`):** Se implementaron hooks de estado para controlar de manera reactiva la lista de maniquíes recuperada de la base de datos y la información temporal de los campos de inserción.
* **Ciclo de Vida y Sincronización (`useEffect`):** Se utilizó para disparar la petición HTTP hacia el backend de manera automática e inmediata una vez que el componente se monta en el navegador, asegurando datos en tiempo real.
* **Renderización Dinámica:** Se manipuló el DOM de forma óptima utilizando el método de renderizado iterativo (`.map()`) de JavaScript para procesar el array JSON proveniente de MySQL y dibujar las filas de la tabla dinámicamente.

### Flujo de Comunicación del Sistema (Data Flow)
1. **React (`useEffect`)** realiza un llamado asíncrono con `fetch()` hacia el puerto del servidor.
2. El backend en **Express** recibe la petición, ejecuta la consulta estructurada en **MySQL** y retorna la estructura en formato JSON.
3. **React** procesa el JSON, actualiza su estado interno y **renderiza la UI** sin necesidad de recargar la página.

### Tecnologías Utilizadas

**Backend**: Node.js, Express.js, Cors, Dotenv.

**Frontend**: React.js, Vite.js, JavaScript.