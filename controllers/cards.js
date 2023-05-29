const Card = require('../models/card');
const Utils = require('../utils/utils');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(Utils.badRequestErrorCode).send(Utils.badRequestErrorMessage);
      } else {
        res.status(Utils.serverErrorCode).send(Utils.serverErrorMessage);
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(Utils.serverErrorCode).send(Utils.serverErrorMessage));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(Utils.notFoundErrorCode).send(Utils.notFoundErrorMessage);
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send({ message: 'Пост удалён' }));
      }})
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(Utils.badRequestErrorCode).send(Utils.badRequestErrorMessage);
      } else {
        res.status(Utils.serverErrorCode).send(Utils.serverErrorMessage);
      }
    });
};

const handleLikeCard = (req, res, options) => {
  const action = options.addLike ? '$addToSet' : '$pull';
  Card.findById(req.params.cardId)
    .then(card => {
      if(!card) {
        res.status(Utils.notFoundErrorCode).send(Utils.notFoundErrorMessage);
      } else {
         Card.findByIdAndUpdate(
            req.params.cardId,
           { [action]: { likes: req.user._id } },
           { new: true },
         )
          .then((newCard) => res.send(newCard));
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

module.exports.likeCard = (req, res) => {
  handleLikeCard(req, res, { addLike: true });
};


module.exports.dislikeCard = (req, res) => {
  handleLikeCard(req, res, { addLike: false });
};