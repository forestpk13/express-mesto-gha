const users = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserAvatar,
  updateUserInfo,
  getOwnProfile,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/me', getOwnProfile);
users.get('/:userId', getUserById);
users.patch('/me', updateUserInfo);
users.patch('/me/avatar', updateUserAvatar);

module.exports = users;
