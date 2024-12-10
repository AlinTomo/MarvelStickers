// swaggerOptions.js
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentazione API',
      version: '1.0.0',
      description: 'Documentazione delle API del progetto',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Server locale',
      },
    ],
  },
  apis: [path.join(__dirname, 'index.js')], // Modifica il percorso ai tuoi file di annotazione JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
