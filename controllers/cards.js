const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFounderror');
const ForbiddenError = require('../errors/forbiddenError');
const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пост с таким id не найден');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send({ message: 'Пост удалён' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный формат id карточки'));
      } else {
        next(err);
      }
    });
};

const handleLikeCard = (req, res, next, options) => {
  const action = options.addLike ? '$addToSet' : '$pull';
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пост с таким id не найден');
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
        next(new BadRequestError('Некорректный формат id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res) => {
  handleLikeCard(req, res, { addLike: true });
};

module.exports.dislikeCard = (req, res) => {
  handleLikeCard(req, res, { addLike: false });
};
