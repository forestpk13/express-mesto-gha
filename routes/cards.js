const cards = require('express').Router();
const { createCard, getCards, deleteCard, dislikeCard, likeCard } = require('../controllers/cards');

cards.post('/', createCard);
cards.get('/', getCards);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', likeCard);
cards.delete('/:cardId/likes', dislikeCard);

module.exports = cards;