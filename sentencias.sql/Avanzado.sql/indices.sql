USE fabrica_maniquies;

-- Índice para buscar maniquíes por nombre de modelo sin leer toda la tabla
CREATE INDEX idx_nombre_modelo ON maniquies(nombre_modelo);

-- Índice para acelerar reportes de producción por fecha
CREATE INDEX idx_fecha_fab ON piezas(fecha_fabricacion);