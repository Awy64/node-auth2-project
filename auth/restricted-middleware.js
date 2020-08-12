//buildout middle ware to restrict access baised on token received.
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
module.exports = (req, res, next) => {
  if(!req.headers.authorization){
    res.status(401).json({message: 'token required'})
  }
  const [authType, token] = req.headers.authorization.split(" ");
  if(token){
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err){
        res.status(401).json({error: "invalid token"})
      }else{
        res.decodedjwt = decodedToken;
        next();
      }
    })
  }else{
    res.status(401).json({message: 'token required'})
  }
}