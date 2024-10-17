const express = require ("express");
const morgan = require ("morgan");
const app = express();
const swaggerUI = require ("swagger-ui-express");
const specs = require ('./routes/swagger');
const librosRoutes = require ("./routes/booksRoutes");
const login = require ("./routes/authRoutes");


//settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Route
app.use("/api-libros", swaggerUI.serve, swaggerUI.setup(specs));
app.use(login);
app.use(librosRoutes);

module.exports = app;