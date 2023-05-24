const users = require('express').Router();

const User = require('../models/user');

users.post('/', (req, res)=> {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar})
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = users;
