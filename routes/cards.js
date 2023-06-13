const cards = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');
const { validateCardId, validateCardData } = require('../utils/validators/cardValidators');

cards.post('/', validateCardData, createCard);
cards.get('/', getCards);
cards.delete('/:cardId', validateCardId, deleteCard);
cards.put('/:cardId/likes', validateCardId, likeCard);
cards.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cards;
