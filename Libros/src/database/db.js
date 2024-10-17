const mssql = require('mssql');
const config = require('./../../config');

const getConnection = async () => {
    try {
        const pool = await mssql.connect({
            server: config.server,
            database: config.database,
            user: config.user,
            password: config.password,
            port: Number(config.port), 
            options: {
                encrypt: false, 
                trustServerCertificate: true, 
            },
        });
        return pool;
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
};

module.exports = { getConnection };
