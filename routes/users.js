const users = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserAvatar,
  updateUserInfo,
  getOwnProfile,
} = require('../controllers/users');
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../utils/validators/userValidators');

users.get('/', getUsers);
users.get('/me', getOwnProfile);
users.get('/:userId', validateUserId, getUserById);
users.patch('/me', validateUserInfo, updateUserInfo);
users.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = users;
