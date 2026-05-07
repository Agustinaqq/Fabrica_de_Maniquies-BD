USE fabrica_maniquies;

DELIMITER //

CREATE PROCEDURE sp_insertar_pieza(
    IN p_tipo INT, 
    IN p_material INT, 
    IN p_color INT, 
    IN p_maniqui INT, 
    IN p_talle VARCHAR(20)
)
BEGIN
    INSERT INTO piezas (tipo_pieza_id, material_id, color_id, id_maniqui, talle, fecha_fabricacion)
    VALUES (p_tipo, p_material, p_color, p_maniqui, p_talle, CURDATE());
END //

DELIMITER ;