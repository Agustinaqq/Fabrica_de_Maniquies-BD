USE fabrica_maniquies;

START TRANSACTION;

INSERT INTO maniquies (nombre_modelo, estado) VALUES ('Modelo Prototipo X1', 'Disponible');
INSERT INTO piezas (tipo_pieza_id, material_id, color_id, id_maniqui, talle, fecha_fabricacion)
VALUES (1, 1, 1, LAST_INSERT_ID(), 'Grande', CURDATE());

COMMIT;