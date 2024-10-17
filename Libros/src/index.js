const app = require("./app");

const main = () => {
    app.listen(app.get('port'));
    console.log(`Server esta corriendo en el puerto: ${app.get('port')}`);
};

main();








