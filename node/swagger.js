// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Documentazione Marvel API',
    description: 'Documentazione per un sito fatto per un progetto universitario API',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';  // File di output
const endpointsFiles = ['./index.js'];  // Percorso del file principale

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index');  // Avvia l'app (assicurati che questo file esista)
});
