const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Utils = require('./utils/utils');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use('*', (req, res) => {
  res.status(Utils.notFoundErrorCode).send(Utils.notFoundErrorMessage);
});

app.listen(PORT, () => {});
