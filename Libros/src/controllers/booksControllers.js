const { getConnection } = require("../database/db");
const jwt = require('jsonwebtoken');

// Simulación del usuario que este en la BD (reemplazar con una base de datos)
const mockUser = {
    username: 'testUser',
    password: 'password123'
};

const login = (req, res) => {
    const { username, password } = req.body;

    if (username !== mockUser.username || password !== mockUser.password) {
         res.sendStatus(401); // Unauthorized
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token }); // Retorna el token
};

const getBooks = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.request().query("SELECT * FROM Libros");
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getBook = async (req, res) => {
    try {
        console.log(req.params);
        const { LibroID } = req.params;
        const connection = await getConnection();
        const result = await connection.request()
            .input('LibroID', LibroID)
            .query("SELECT * FROM Libros WHERE LibroID = @LibroID");
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addBook = async (req, res) => {
    try {
        const { Titulo, Autor, AnoPublicado, Estado } = req.body;
        const connection = await getConnection();
        const result = await connection.request()
            .input('Titulo', Titulo)
            .input('Autor', Autor)
            .input('AnoPublicado', AnoPublicado)
            .input('Estado', Estado)
            .query("INSERT INTO Libros (Titulo, Autor, AnoPublicado, Estado) VALUES (@Titulo, @Autor, @AnoPublicado, @Estado)");
        console.log(result);
        res.json(addBook);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateBook = async (req, res) => {
    try {
        const book = { Titulo, Autor, AnoPublicado, Estado } = req.body;
        const { LibroID } = req.params;
        const connection = await getConnection();
        const result = await connection.request()
            .input('LibroID', LibroID)
            .input('Titulo', Titulo)
            .input('Autor', Autor)
            .input('AnoPublicado', AnoPublicado)
            .input('Estado', Estado)
            .query("UPDATE Libros SET Titulo = @Titulo, Autor = @Autor, AnoPublicado = @AnoPublicado, Estado = @Estado WHERE LibroID = @LibroID");

        console.log(result);
        res.json(addBook);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteBook = async (req, res) => {
    try {
        console.log(req.params);
        const { LibroID } = req.params;
        const connection = await getConnection();
        const result = await connection.request()
            .input('LibroID', LibroID)
            .query("DELETE FROM Libros WHERE LibroID = @LibroID");
        console.log(result);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

module.exports = {
    login,
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
};