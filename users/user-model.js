//build out db model for users
const db = require('../data/db-config');

module.exports = {
  add,
  findById,
  find,
  findBy
}

function add(user){
  return db('users').insert(user).then(id => {
    return findById(id).first()
  })
}

function findById(id){
  return db('users').where({"id": id});
}

function find(){
  return db('users').select("id", "username").orderBy('id');
}

function findBy(filter){
  return db('users').where(filter).orderBy('id')
}