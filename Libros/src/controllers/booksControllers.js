const { getConnection } = require("../database/db");

const getBooks = async (req, res) => {
    try {
        const connection = await getConnection();
        const getResult = await connection.request().query("SELECT * FROM Libros");
        console.log(getResult);
        res.status(200).json(getResult.recordset[0]);
    } catch (error) {
        console.error('Error obteniendo el libro: ', error.message);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

const getBook = async (req, res) => {
    try {
        console.log(req.params);
        const { LibroID } = req.params;
        const connection = await getConnection();
        const obtenerResult = await connection.request()
            .input('LibroID', LibroID)
            .query("SELECT * FROM Libros WHERE LibroID = @LibroID");
        console.log(obtenerResult);
        res.status(200).json(obtenerResult.recordset[0]);
    } catch (error) {
        console.error('Error obteniendo los libros: ', error.message);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

const addBook = async (req, res) => {
    try {
        const { Titulo, Autor, AnoPublicado, Estado } = req.body;
        const connection = await getConnection();
        const insertResult  = await connection.request()
            .input('Titulo', Titulo)
            .input('Autor', Autor)
            .input('AnoPublicado', AnoPublicado)
            .input('Estado', Estado)
            .query("INSERT INTO Libros (Titulo, Autor, AnoPublicado, Estado) VALUES (@Titulo, @Autor, @AnoPublicado, @Estado)");
        
        const insertedBookID = insertResult.recordset[0].LibroID;
        res.status(201).json({
            message: 'Libro añadido exitosamente',
            book: {LibroID: insertedBookID, Titulo, Autor, AnoPublicado, Estado},
        });
    } catch (error) {
        console.error('Error al añadir el libro: ', error.message);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = { Titulo, Autor, AnoPublicado, Estado } = req.body;
        const { LibroID } = req.params;
        const connection = await getConnection();
        const updateResult = await connection.request()
            .input('LibroID', LibroID)
            .input('Titulo', Titulo)
            .input('Autor', Autor)
            .input('AnoPublicado', AnoPublicado)
            .input('Estado', Estado)
            .query("UPDATE Libros SET Titulo = @Titulo, Autor = @Autor, AnoPublicado = @AnoPublicado, Estado = @Estado WHERE LibroID = @LibroID"
            );

        if (updateResult.rowsAffected[0] === 0) {
            return res.status(404).json({ message: `No se encontró un libro con el ID: ${LibroID}` });
        }

        console.log(`Libro con ID ${LibroID} actualizado correctamente`);
        res.status(200).json({
            message: `Libro con ID ${LibroID} actualizado correctamente`,
            book: { Titulo, Autor, AnoPublicado, Estado }
        });
    } catch (error) {
        console.error('Error al actualizar el libro: ', error.message);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};


const deleteBook = async (req, res) => {
    try {
        const { LibroID } = req.params;
        const connection = await getConnection();
        const deleteResult = await connection.request()
            .input('LibroID', LibroID)
            .query("DELETE FROM Libros WHERE LibroID = @LibroID");

        
        if (deleteResult.rowsAffected[0] === 0) {
            return res.status(404).json({ message: `No se encontró un libro con el ID: ${LibroID}` });
        }

        console.log(`Libro con ID ${LibroID} eliminado correctamente`);
        res.status(200).json({ message: `Libro con ID ${LibroID} eliminado correctamente` });

    } catch (error) {
        console.error('Error al eliminar el libro: ', error.message);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
};