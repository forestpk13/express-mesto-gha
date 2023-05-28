const User = require('../models/user');
const Utils = require('../utils/utils')


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar})
    .then(user => res.status(201).send({ data: user }))
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(Utils.badRequestErrorCode).send(Utils.badRequestErrorMessage);
      } else {
        res.status(500).send({ message: 'Произошла ошибка'})
      }
    });
};

const updateUser = (req, res, userData) => {
  User.findByIdAndUpdate(req.user._id, userData, { new: true },)
    .then((user) => res.send(user))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
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
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if(!user) {
        res.status(Utils.notFoundErrorCode).send(Utils.notFoundErrorMessage);
      } else {
        res.send({ data: user })
      }
    })
    .catch(err => {
      if(err.name === 'CastError') {
        res.status(Utils.badRequestErrorCode).send(Utils.badRequestErrorMessage);
      } else {
        res.status(500).send({ message: 'Произошла ошибка'})
      }
    });
}
