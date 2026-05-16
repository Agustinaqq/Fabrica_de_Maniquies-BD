const express = require('express');
const db = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARES
// ==========================================
app.use(cors()); // Permite que React se conecte desde otro puerto (ej: 5173)
app.use(express.json()); // Permite que el servidor entienda JSON en el body

// ==========================================
// ENDPOINTS (RUTAS DE LA API)
// ==========================================

// 🏠 1. RUTA RAÍZ (GET /) - Para chequear que la API responda
app.get('/', (req, res) => {
    res.json({ 
        mensaje: "🏭 API Fábrica de Maniquíes funcionando perfectamente",
        estado: "Online"
    });
});

// 🔍 2. OBTENER TODOS LOS MANIQUÍES CON SUS DETALLES (GET /maniquies)
app.get('/maniquies', async (req, res) => {
    try {
        // Hacemos un JOIN con la tabla piezas para traer materiales y colores agrupados
        const [rows] = await db.query(`
            SELECT 
                m.id_maniqui, 
                m.nombre_modelo, 
                m.estado,
                IFNULL(GROUP_CONCAT(DISTINCT p.material SEPARATOR ', '), 'Sin especificar') AS materiales,
                IFNULL(GROUP_CONCAT(DISTINCT p.color SEPARATOR ', '), 'Sin especificar') AS colores
            FROM maniquies m
            LEFT JOIN piezas p ON m.id_maniqui = p.id_maniqui
            GROUP BY m.id_maniqui
        `);
        res.json(rows);
    } catch (error) {
        console.error("🔴 Error al obtener maniquíes con detalles:", error.message);
        res.status(500).json({ error: 'Error al obtener los maniquíes', detalle: error.message });
    }
});

// 🎯 3. BUSCAR UN MANIQUÍ POR ID (GET /maniquies/:id)
app.get('/maniquies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM maniquies WHERE id_maniqui = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Maniquí no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("🔴 Error al buscar maniquí:", error.message);
        res.status(500).json({ error: 'Error al buscar el maniquí', detalle: error.message });
    }
});

// ➕ 4. CREAR UN NUEVO MANIQUÍ CON PIEZA INICIAL (POST /maniquies)
app.post('/maniquies', async (req, res) => {
    const { nombre_modelo, estado, material, color } = req.body;
    
    // Validación de que no llegue nada vacío
    if (!nombre_modelo || !estado || !material || !color) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: nombre_modelo, estado, material y color' });
    }
    
    // Usamos una conexión dedicada para asegurar que si algo falla, no se guarde nada a medias (Transacción)
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // PASO 1: Insertar el maniquí
        const [maniquiResult] = await connection.query(
            'INSERT INTO maniquies (nombre_modelo, estado) VALUES (?, ?)', 
            [nombre_modelo, estado]
        );
        const nuevoIdManiqui = maniquiResult.insertId;

        // PASO 2: Insertar su pieza inicial asociando el id_maniqui que acabamos de generar
        // Nota: Asegurate de que los nombres de las columnas coincidan con tu tabla 'piezas' (ej: nombre_pieza, material, color, id_maniqui)
        await connection.query(
            'INSERT INTO piezas (nombre_pieza, material, color, id_maniqui) VALUES (?, ?, ?, ?)',
            ['Pieza Base', material, color, nuevoIdManiqui]
        );

        // Si todo salió bien, guardamos los cambios definitivamente
        await connection.commit();
        
        res.status(201).json({ 
            mensaje: 'Maniquí y pieza inicial creados con éxito 🎉', 
            id_maniqui: nuevoIdManiqui 
        });
    } catch (error) {
        // Si hubo un error (por ejemplo, no existe la tabla piezas o cambian los nombres de columnas), deshacemos todo
        await connection.rollback();
        console.error("🔴 Error en la transacción de inserción:", error.message);
        res.status(500).json({ error: 'Error al insertar el maniquí completo', detalle: error.message });
    } finally {
        connection.release(); // Liberamos la conexión al pool
    }
});

// 🔄 5. ACTUALIZAR UN MANIQUÍ (PUT /maniquies/:id)
app.put('/maniquies/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_modelo, estado } = req.body;
    
    if (!nombre_modelo || !estado) {
        return res.status(400).json({ error: 'Faltan campos para actualizar' });
    }
    
    try {
        const [result] = await db.query(
            'UPDATE i_maniquies SET nombre_modelo = ?, estado = ? WHERE id_maniqui = ?',
            [nombre_modelo, estado, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'No se encontró el maniquí para actualizar' });
        }
        res.json({ mensaje: 'Maniquí actualizado correctamente 🔄' });
    } catch (error) {
        console.error("🔴 Error al actualizar maniquí:", error.message);
        res.status(500).json({ error: 'Error al actualizar el maniquí', detalle: error.message });
    }
});

// ❌ 6. ELIMINAR UN MANIQUÍ (DELETE /maniquies/:id)
app.delete('/maniquies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM maniquies WHERE id_maniqui = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'No se encontró el maniquí para eliminar' });
        }
        res.json({ mensaje: 'Maniquí eliminado correctamente ❌' });
    } catch (error) {
        console.error("🔴 Error al eliminar maniquí:", error.message);
        // Enviamos el detalle completo por si salta la restricción de clave foránea (FK) de MySQL
        res.status(500).json({ error: 'Error al eliminar el maniquí', detalle: error.message });
    }
});

// ==========================================
// ENCENDIDO DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});