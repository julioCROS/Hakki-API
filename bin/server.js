const app = require('../src/app');
const http = require('http');
const debug = require('debug')('node-str:server');

const port = (process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log("Servidor online na porta:", port);