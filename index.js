//call server and make listen here
const server = require('./api/server');

const port = process.env.PORT || 1338

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})