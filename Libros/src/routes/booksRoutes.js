const Router = require('express');
const BooksControllers = require("../controllers/booksControllers");
const authenticateJWT = require('../controllers/authControllers'); 
const router = Router();


/**
 * @swagger
 * /getBooks:
 *   get:
 *     description: Responde la lista de todos los libros.
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Retorna todos los libros en formato JSON.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   LibroID:
 *                     type: integer
 *                     example: 1
 *                   Titulo:
 *                     type: string
 *                     example: "El Quijote"
 *                   Autor:
 *                     type: string
 *                     example: "Miguel de Cervantes"
 *                   AnoPublicado:
 *                     type: string
 *                     example: "1615"
 *                   Estado:
 *                     type: string
 *                     example: "disponible"
 */
router.get("/getBooks", BooksControllers.getBooks);


/**
 * @swagger
 * /getBook/{LibroID}:
 *   get:
 *     description: Obtiene un libro específico por su ID.
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: LibroID
 *         required: true
 *         description: ID del libro que deseas obtener.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Retorna el libro en formato JSON.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 LibroID:
 *                   type: integer
 *                   example: 1
 *                 Titulo:
 *                   type: string
 *                   example: "El Quijote"
 *                 Autor:
 *                   type: string
 *                   example: "Miguel de Cervantes"
 *                 AnoPublicado:
 *                   type: string
 *                   example: "1615"
 *                 Estado:
 *                   type: string
 *                   example: "disponible"
 */
router.get("/getBook/:LibroID", BooksControllers.getBook);


/**
 * @swagger
 * /addBook:
 *   post:
 *     security:
 *       - bearerAuth: []   # Hacer referencia al esquema de seguridad JWT
 *     description: Agrega un nuevo libro en formato JSON.
 *     tags: 
 *       - Libros
 *     requestBody:  # Definición del cuerpo de la solicitud
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LibroID:
 *                 type: integer
 *                 example: 1
 *               Titulo:
 *                 type: string
 *                 example: "El Quijote"
 *               Autor:
 *                 type: string
 *                 example: "Miguel de Cervantes"
 *               AnoPublicado:
 *                 type: string
 *                 example: "1615"
 *               Estado:
 *                 type: string
 *                 example: "disponible"
 *     responses:
 *       201:
 *         description: Libro agregado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Libro agregado correctamente"
 */
router.post("/addBook", authenticateJWT, BooksControllers.addBook);


/**
 * @swagger
 * /updateBook/{LibroID}:
 *   put:
 *     description: Actualiza un libro específico por su ID.
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: LibroID
 *         required: true
 *         description: ID del libro que deseas actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Titulo:
 *                 type: string
 *                 example: "El Quijote"
 *               Autor:
 *                 type: string
 *                 example: "Miguel de Cervantes"
 *               AnoPublicado:
 *                 type: string
 *                 example: "1615"
 *               Estado:
 *                 type: string
 *                 example: "disponible"
 *     responses:
 *       200:
 *         description: Libro actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Libro actualizado correctamente."
 */
router.put("/updateBook/:LibroID", authenticateJWT, BooksControllers.updateBook);


/**
 * @swagger
 * /deleteBook/{LibroID}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     description: Elimina un libro específico por su ID.
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: LibroID
 *         required: true
 *         description: ID del libro que deseas eliminar.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Libro eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Libro eliminado correctamente."
 */
router.delete("/deleteBook/:LibroID", authenticateJWT, BooksControllers.deleteBook);

module.exports = router;