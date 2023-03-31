const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'OPEN Archive API',
    description: 'Shows bibliography of files',
  },
  host: "https://open-archive.onrender.com",
  basePath: "/",
  schemes: ['http', 'https'],
  produces: ['application/json']
};
/*licence : {
  name: "GPL3",
  url: "https://www.gnu.org/licenses/gpl-3.0.html"
  }*/

const outputFile = './swagger.json';

//An API ENDPOINT is where the request is sended at the end. If i want to show only the users API, ill show here:
//const endpointsFiles = ['./routers/users.js'];

//Or if i want to show all the processes of the website, ill go to the main router
const endpointsFiles = ['./routers/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);
