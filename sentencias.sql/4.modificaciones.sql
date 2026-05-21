USE fabrica_maniquies;

UPDATE maniquies 
SET estado = 'En Exhibición' 
WHERE id_maniqui = 1;

UPDATE piezas 
SET talle = 'Grande' 
WHERE id_pieza = 5;

ALTER TABLE maniquies 
ADD COLUMN precio_venta DECIMAL(10,2) DEFAULT 0.00;