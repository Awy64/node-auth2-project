//build out user router here
const router = require('express').Router();
const Users = require('./user-model');
const restricted = require('../auth/restricted-middleware')





router.get('/', restricted, async (req, res) => {
  try {
    const user = await Users.find();
    res.json(user)
  } catch (error) {
    res.status(500).json({err: error})
  }
})

module.exports = router