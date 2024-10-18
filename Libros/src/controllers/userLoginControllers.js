const jwt = require('jsonwebtoken');

// Simulación del usuario que este en la BD (reemplazar con una base de datos)
const mockUser = {
    username: 'testUser',
    password: 'password123'
};

const userLogin = (req, res) => {
    const { username, password } = req.body;

    if (username !== mockUser.username || password !== mockUser.password) {
         res.sendStatus(401); // Unauthorized
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token }); // Retorna el token
};

module.exports = userLogin;