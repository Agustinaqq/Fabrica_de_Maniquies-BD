USE fabrica_maniquies;

-- A. Actualizar el estado de un maniquí (De 'Disponible' a 'En Exhibición')
UPDATE maniquies 
SET estado = 'En Exhibición' 
WHERE id_maniqui = 1;

-- B. Corregir un talle (Supongamos que un 'Mediano' era en realidad 'Grande')
UPDATE piezas 
SET talle = 'Grande' 
WHERE id_pieza = 5;

-- C. Agregar una columna nueva a la tabla de Maniquíes (por si el profesor pide cambios de estructura)
ALTER TABLE maniquies 
ADD COLUMN precio_venta DECIMAL(10,2) DEFAULT 0.00;