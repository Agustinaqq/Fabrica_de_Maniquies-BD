const mysql = require('mysql2');
require('dotenv').config();

// Creamos un "pool" de conexiones, que es más eficiente para servidores
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos la versión con Promesas para usar async/await de forma moderna
module.exports = pool.promise();