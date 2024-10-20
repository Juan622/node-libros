
require('dotenv').config();  

module.exports = {
    server: process.env.DB_HOST, 
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    JWT_SECRET: process.env.JWT_SECRET,
};

