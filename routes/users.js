const users = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserAvatar,
  updateUserInfo,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:userId', getUserById);
users.patch('/me', updateUserInfo);
users.patch('/me/avatar', updateUserAvatar);

module.exports = users;
