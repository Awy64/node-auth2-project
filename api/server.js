// create server here
const express = require('express');
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/user-router')


const server = express();

server.use(express.json());


server.use('/api/auth', authRouter)
server.use("/api/users", usersRouter)



server.get('/', (req, res) => {
  res.json({api: "up and running"})
})



module.exports = server