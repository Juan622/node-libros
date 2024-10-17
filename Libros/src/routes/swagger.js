const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Libros API',
            version: '1.0.0',
            description: 'API Test JUJU',
            contact: {
                name: 'Juan David Bedoya'
            }
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Local server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {       
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'  
                }
            }
        },
        security: [
            {
                bearerAuth: []      
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJSDoc(options);
module.exports = specs;