const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'поле должно содержать минимум 2 символа'],
    maxlength: [30, 'максимальная длина поля 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'поле должно содержать минимум 2 символа'],
    maxlength: [30, 'максимальная длина поля 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: ({ value }) => `${value} - некорректный адрес email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
