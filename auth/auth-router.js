//build out auth router here
const router = require('express').Router();
const Users = require('../users/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')
const {isValid} = require('../users/users-services');



router.post('/register', async (req, res) => {
  const user = req.body
  if(isValid(user)){
  const hash = bcrypt.hashSync(user.password, 11)
  user.password = hash
  try {
    const add = await Users.add(user)
    console.log(add)
    const token = genarateToken(add)
    res.status(201).json({message: "User created", token})
  } catch (error) {
    res.status(500).json({err: error})
  }
}else{
  res.status(400).json({
    message: "please provide username and password and the password sould be alphanumeric"
  })
}
})

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  if(isValid(req.body)){
    try{
    const [user] = await Users.findBy({username: username})
    if(user && bcrypt.compareSync(password, user.password)){
      const token = genarateToken(user)
      res.status(200).json({message: "logged in", token})
    }else{
      res.status(401).json({message: "invalid username or password"})
    }
    }catch(error){
    res.status(500).json({message: error.message})
  }
  }else{
    res.status(400).json({
      message: "please provide username and password and the password sould be alphanumeric"
    })
  }
})

function genarateToken(user){
  const payload = {
    sub: user.id,
    username: user.username,
    department: user.department
  }
  const secret = secrets.jwtSecret
  const options = {
    expiresIn: "1h"
  }
  return jwt.sign(payload, secret, options)
}


module.exports = router