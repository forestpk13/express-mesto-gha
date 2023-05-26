const users = require('express').Router();
const { createUser, getUsers, getUserById } = require('../controllers/users');

users.post('', createUser);
users.get('/', getUsers);
users.get('/:userId', getUserById);

module.exports = users;
