const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
require('dotenv').config();
const port = 3004;
const cors = require('cors');
const corsOptions = {
  origin: process.env.REACT_APP_CLIENT || "http://localhost:3000",
  methods: ["GET", "POST", "PUT"]
};
console.log(process.env.REACT_APP_CLIENT);
server.use(cors(corsOptions));

//server.use(middlewares);
server.use(router);

server.listen(port);