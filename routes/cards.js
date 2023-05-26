const cards = require('express').Router();
const { createCard, getCards, deleteCard } = require('../controllers/cards');

cards.post('/', createCard);
cards.get('/', getCards);
cards.delete('/:cardId', deleteCard);

module.exports = cards;