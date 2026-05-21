USE fabrica_maniquies;

SELECT p.id_pieza AS Nro_Serie, m.nombre AS Material, c.nombre AS Color
FROM piezas p
JOIN tipos_pieza t ON p.tipo_pieza_id = t.id_tipo
JOIN materiales m ON p.material_id = m.id_material
JOIN colores c ON p.color_id = c.id_color
WHERE t.nombre = 'Pierna Derecha';

SELECT p.id_pieza, p.fecha_fabricacion
FROM piezas p
JOIN tipos_pieza t ON p.tipo_pieza_id = t.id_tipo
WHERE t.nombre = 'Cabeza' AND p.fecha_fabricacion > '2026-01-01';

SELECT p.id_pieza, m.nombre AS Material, p.talle
FROM piezas p
JOIN materiales m ON p.material_id = m.id_material
JOIN tipos_pieza t ON p.tipo_pieza_id = t.id_tipo
WHERE t.nombre = 'Torso' AND p.talle IN ('Mediano', 'Largo')
ORDER BY m.nombre ASC;

SELECT m.nombre AS Material, COUNT(p.id_pieza) AS Total_Piezas
FROM piezas p
JOIN materiales m ON p.material_id = m.id_material
GROUP BY m.nombre;

SELECT m.id_maniqui, m.fecha_ensamblaje, p.id_pieza AS ID_Cabeza
FROM maniquies m
JOIN piezas p ON m.id_maniqui = p.id_maniqui
JOIN tipos_pieza t ON p.tipo_pieza_id = t.id_tipo
WHERE t.nombre = 'Cabeza';

SELECT p.id_pieza, t.nombre AS Tipo, c.nombre AS Color
FROM piezas p
JOIN tipos_pieza t ON p.tipo_pieza_id = t.id_tipo
JOIN colores c ON p.color_id = c.id_color
WHERE c.nombre = 'Negro Mate';