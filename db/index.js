const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 3004;
const cors = require('cors');
const corsOptions = {
  origin: "https://marat13.ru",
  methods: ["GET", "POST", "PUT"]
};

server.use(cors(corsOptions));

server.use(middlewares);
server.use(router);

server.listen(port);