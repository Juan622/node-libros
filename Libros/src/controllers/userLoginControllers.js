const jwt = require('jsonwebtoken');

// Simulación del usuario que este en la BD (reemplazar con una base de datos)
const mockUser = {
    username: 'testUser',
    password: 'password123'
};

const userLogin = (req, res) => {
    try {
        const { username, password } = req.body;

        if (username !== mockUser.username || password !== mockUser.password) {
                res.sendStatus(401); 
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token }); 
    } catch (error) {
        console.error('Error en el login: ', error.message);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

module.exports = userLogin;