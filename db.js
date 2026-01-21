const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
}).promise();

// Verificar la conexión
pool.getConnection()
    .then(connection => {
        console.log('✅ Conexión exitosa a la base de datos');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error al conectar a la base de datos:', err.message);
    });

module.exports = pool;
