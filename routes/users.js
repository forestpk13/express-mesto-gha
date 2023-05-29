const users = require('express').Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUserAvatar,
  updateUserInfo,
} = require('../controllers/users');

users.post('', createUser);
users.get('/', getUsers);
users.get('/:userId', getUserById);
users.patch('/me', updateUserInfo);
users.patch('/me/avatar', updateUserAvatar);

module.exports = users;
