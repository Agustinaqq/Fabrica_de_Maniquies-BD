USE fabrica_maniquies;

-- 1. INSERCIÓN DE CATÁLOGOS
INSERT INTO tipos_pieza (id_tipo, nombre) VALUES 
(1, 'Cabeza'), (2, 'Torso'), (3, 'Brazo Izquierdo'), (4, 'Brazo Derecho'), 
(5, 'Pierna Izquierda'), (6, 'Pierna Derecha'), (7, 'Base');

INSERT INTO materiales (id_material, nombre) VALUES 
(1, 'Plástico ABS'), (2, 'Madera de Haya'), (3, 'Fibra de Vidrio'), (4, 'Silicona');

INSERT INTO colores (id_color, nombre) VALUES 
(1, 'Blanco Mate'), (2, 'Negro Mate'), (3, 'Piel Claro'), (4, 'Gris Metalizado');

-- 2. INSERCIÓN DE MANIQUÍES
INSERT INTO maniquies (id_maniqui, nombre_modelo) VALUES 
(1, 'Modelo Slim A1'), (2, 'Modelo Muscular M2'), (3, 'Modelo Infantil K3'), 
(4, 'Modelo Vintage W4'), (5, 'Modelo Sastre S5');

-- 3. CARGA DE 40 PIEZAS
INSERT INTO piezas (tipo_pieza_id, material_id, color_id, id_maniqui, talle, fecha_fabricacion) VALUES 
-- Maniquí 1
(1,1,1,1,'Pequeño','2026-04-10'),(2,1,1,1,'Mediano','2026-04-10'),(3,1,1,1,'Mediano','2026-04-11'),(4,1,1,1,'Mediano','2026-04-11'),(5,1,1,1,'Mediano','2026-04-12'),(6,1,1,1,'Mediano','2026-04-12'),(7,1,1,1,'N/A','2026-04-13'),(1,1,1,1,'Pequeño','2026-04-14'),
-- Maniquí 2
(1,3,2,2,'Grande','2026-05-01'),(2,3,2,2,'Largo','2026-05-01'),(3,3,2,2,'Largo','2026-05-02'),(4,3,2,2,'Largo','2026-05-02'),(5,3,2,2,'Largo','2026-05-03'),(6,3,2,2,'Largo','2026-05-03'),(7,3,2,2,'N/A','2026-05-04'),(2,3,2,2,'Largo','2026-05-04'),
-- Maniquí 3
(1,1,3,3,'Pequeño','2026-01-15'),(2,1,3,3,'Pequeño','2026-01-15'),(3,1,3,3,'Pequeño','2026-01-16'),(4,1,3,3,'Pequeño','2026-01-16'),(5,1,3,3,'Pequeño','2026-01-17'),(6,1,3,3,'Pequeño','2026-01-17'),(7,1,3,3,'N/A','2026-01-18'),(1,1,3,3,'Pequeño','2026-01-18'),
-- Maniquí 4
(1,2,1,4,'Mediano','2025-12-20'),(2,2,1,4,'Mediano','2025-12-20'),(3,2,1,4,'Mediano','2025-12-21'),(4,2,1,4,'Mediano','2025-12-21'),(5,2,1,4,'Mediano','2025-12-22'),(6,2,1,4,'Mediano','2025-12-22'),(7,2,1,4,'N/A','2025-12-23'),(2,2,1,4,'Mediano','2025-12-23'),
-- Maniquí 5
(1,4,4,5,'Grande','2026-03-01'),(2,4,4,5,'Largo','2026-03-01'),(3,4,4,5,'Largo','2026-03-02'),(4,4,4,5,'Largo','2026-03-02'),(5,4,4,5,'Largo','2026-03-03'),(6,4,4,5,'Largo','2026-03-03'),(7,4,4,5,'N/A','2026-03-04'),(1,4,4,5,'Grande','2026-03-04');