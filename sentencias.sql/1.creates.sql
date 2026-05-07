-- 1. CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS fabrica_maniquies;
USE fabrica_maniquies;

-- 2. TABLA: tipos_pieza (Catálogo de partes: cabeza, torso, etc.)
CREATE TABLE tipos_pieza (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- 3. TABLA: materiales (Catálogo de materiales)
CREATE TABLE materiales (
    id_material INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- 4. TABLA: colores (Catálogo de colores y acabados)
CREATE TABLE colores (
    id_color INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    codigo_hex VARCHAR(7)
);

-- 5. TABLA: maniquies (Entidad que agrupa las piezas)
CREATE TABLE maniquies (
    id_maniqui INT AUTO_INCREMENT PRIMARY KEY,
    nombre_modelo VARCHAR(100) NOT NULL,
    fecha_ensamblaje TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'Disponible'
);

-- 6. TABLA: piezas (Detalle de cada componente fabricado)
CREATE TABLE piezas (
    id_pieza INT AUTO_INCREMENT PRIMARY KEY,
    tipo_pieza_id INT,
    material_id INT,
    color_id INT,
    id_maniqui INT,
    talle VARCHAR(20),
    fecha_fabricacion DATE NOT NULL,
    CONSTRAINT fk_tipo FOREIGN KEY (tipo_pieza_id) REFERENCES tipos_pieza(id_tipo),
    CONSTRAINT fk_material FOREIGN KEY (material_id) REFERENCES materiales(id_material),
    CONSTRAINT fk_color FOREIGN KEY (color_id) REFERENCES colores(id_color),
    CONSTRAINT fk_maniqui FOREIGN KEY (id_maniqui) REFERENCES maniquies(id_maniqui)
);