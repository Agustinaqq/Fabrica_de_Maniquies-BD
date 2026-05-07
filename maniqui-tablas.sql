CREATE TABLE `maniquies` (
  `id_maniqui` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre_modelo` varchar(255),
  `estado` varchar(255),
  `fecha_ensamblaje` timestamp,
  `notas` text
);

CREATE TABLE `piezas` (
  `id_pieza` integer PRIMARY KEY AUTO_INCREMENT,
  `tipo_pieza_id` integer,
  `material_id` integer,
  `color_id` integer,
  `id_maniqui` integer,
  `fecha_fabricacion` date,
  `costo_produccion` decimal
);

CREATE TABLE `tipos_pieza` (
  `id_tipo` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255)
);

CREATE TABLE `materiales` (
  `id_material` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255)
);

CREATE TABLE `colores` (
  `id_color` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `codigo_hex` varchar(255)
);

ALTER TABLE `piezas` ADD FOREIGN KEY (`id_maniqui`) REFERENCES `maniquies` (`id_maniqui`);

ALTER TABLE `piezas` ADD FOREIGN KEY (`tipo_pieza_id`) REFERENCES `tipos_pieza` (`id_tipo`);

ALTER TABLE `piezas` ADD FOREIGN KEY (`material_id`) REFERENCES `materiales` (`id_material`);

ALTER TABLE `piezas` ADD FOREIGN KEY (`color_id`) REFERENCES `colores` (`id_color`);
