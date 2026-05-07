USE fabrica_maniquies;

START TRANSACTION;

-- Creamos un nuevo modelo de maniquí
INSERT INTO maniquies (nombre_modelo, estado) 
VALUES ('Modelo Prototipo X1', 'Disponible');

-- Le asignamos su primera pieza usando el último ID generado
INSERT INTO piezas (tipo_pieza_id, material_id, color_id, id_maniqui, talle, fecha_fabricacion)
VALUES (1, 1, 1, LAST_INSERT_ID(), 'Grande', CURDATE());

-- Si ambos INSERT funcionan, confirmamos
COMMIT;