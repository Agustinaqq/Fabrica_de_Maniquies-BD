DELIMITER //

CREATE TRIGGER tr_actualizar_estado_maniqui
AFTER INSERT ON piezas 
FOR EACH ROW
BEGIN
    UPDATE maniquies 
    SET estado = 'En Proceso' 
    WHERE id_maniqui = NEW.id_maniqui;
END //

DELIMITER ;