const express = require('express');
const router = express.Router();
const authenticateJWT = require('../controllers/booksControllers');


/**
 * @swagger
 * /login:
 *   post: 
 *     description: Inicia sesión y devuelve un token JWT.
 *     tags: [Autenticación Create Token]
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testUser"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso y se retorna un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNjE1ODUzMzAwLCJleHAiOjE2MTU4NTY5MDB9.7plWNuno5KFqUVkVLaDbgG7oMmF-IWVohRHAT7fAMJI"
 *       401:
 *         description: Credenciales incorrectas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credenciales incorrectas"
 */
router.post('/login', authenticateJWT.login);

module.exports = router;
