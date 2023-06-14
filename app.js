/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('express-rate-limit');

const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/notFounderror');
const auth = require('./middlewares/auth');
const { validateLoginData, validateRegisterData } = require('./utils/validators/userValidators');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(limiter({
  windowMs: 10 * 60 * 1000,
  max: 100,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use((req, res, next) => {
  req.user = {
    _id: '6470acd676d683d8785829ac',
  };

  next();
});

app.post('/signin', validateLoginData, login);
app.post('/signup', validateRegisterData, createUser);

app.use(auth); // ниже защищенные роуты

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса');
});

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, _, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'Ошибка сервера' : message,
    });
  next();
});

app.listen(PORT, () => {});
