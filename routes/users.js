const users = require('express').Router();
const { createUser, getUsers, getUserById } = require('../controllers/users');

users.post('/users', createUser);
users.get('/users', getUsers);
users.get('/users/:userId', getUserById);

module.exports = users;
