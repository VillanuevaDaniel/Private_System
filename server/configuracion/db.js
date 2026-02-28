const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 3307,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

const pool = mysql.createPool(dbConfig);

// Prueba rápida de conexión al iniciar
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.message);
    if (err.code === 'ECONNREFUSED') {
      console.error('Asegúrate de que el servicio MySQL esté corriendo en el puerto', dbConfig.port);
    }
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
    connection.release();
  }
});

module.exports = pool.promise();
