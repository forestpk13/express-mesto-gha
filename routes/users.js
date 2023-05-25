const users = require('express').Router();
const { createUser, getUsers } = require('../controllers/users');

users.post('/', createUser);

users.get('/', getUsers);

users.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = users;
