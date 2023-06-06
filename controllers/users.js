// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Utils = require('../utils/utils');

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    // eslint-disable-next-line no-unused-vars
    password,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(Utils.badRequestErrorCode).send(err.message);
      } else {
        res.status(Utils.serverErrorCode).send(Utils.serverErrorMessage);
      }
    });
};

const updateUser = (req, res, userData) => {
  User.findByIdAndUpdate(req.user._id, userData, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(Utils.badRequestErrorCode).send(Utils.badRequestErrorMessage);
      } else {
        res.status(Utils.serverErrorCode).send(Utils.serverErrorMessage);
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  const userData = {
    name: req.body.name,
    about: req.body.about,
  };
  updateUser(req, res, userData);
};

module.exports.updateUserAvatar = (req, res) => {
  updateUser(req, res, { avatar: req.body.avatar });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(Utils.serverErrorCode).send(Utils.serverErrorMessage));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(Utils.notFoundErrorCode).send(Utils.notFoundErrorMessage);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(Utils.badRequestErrorCode).send(Utils.badRequestErrorMessage);
      } else {
        res.status(Utils.serverErrorCode).send(Utils.serverErrorMessage);
      }
    });
};
