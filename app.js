const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Utils = require('./utils/utils');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');


app.use((req, res, next) => {
  req.user = {
    _id: '6470acd676d683d8785829ac'
  };

  next();
});

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));
app.use('*', function(req, res) {
  res.status(Utils.notFoundErrorCode).send(Utils.notFoundErrorMessage)
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
