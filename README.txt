1. Clonar el repositorio de Git URL: https://github.com/Juan622/node-libros
2. Crear una DB SQL llamada Libros que contiene algunos registros, importar a sql server el archivo Libros_DB.bacpac de la carpeta llamada Base de datos. 
3. Abrir la carpeta Libros(proyecto) con Visual Studio Code.
4. Configurar el archivo .env con los datos de tu BD local, adicional a esto crea tu palabra secreta para JWT_SECRET como esta 
	en el ejemplo siguiente:
		DB_HOST=localhost
		DB_DATABASE=Libros
		DB_USER=sa
		DB_PASSWORD=12345
		DB_PORT=1433
		JWT_SECRET=palabra_secreta_JUJU
5. Corre el proyecto "npm run dev", en el navegador, corre en la siguiente url http://localhost:4000/api-libros de swagger
	donde tendras las diferentes opciones para crear el Token con un usuario Mock y realizar pruebas sobre los libros.
	

