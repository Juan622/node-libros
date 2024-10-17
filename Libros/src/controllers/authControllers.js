const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extraer el token

    if (!token) {
        return res.sendStatus(403); // Forbidden si no hay token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden si el token es inválido
        }
        req.user = user; // Almacenar la información del usuario
        next(); // Pasar al siguiente middleware o controlador
    });
};

module.exports = authenticateJWT;

