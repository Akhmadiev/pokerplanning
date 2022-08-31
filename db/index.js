const jsonServer = require('json-server')
const newJsonServer = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

newJsonServer.use(middlewares);
newJsonServer.use(router);

newJsonServer.listen(3004, () => {
  console.log(`JSON Server is running on port ${3004}`)
});