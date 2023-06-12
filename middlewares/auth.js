const jwt = require('jsonwebtoken');
const Utils = require('../utils/utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(Utils.unauthorizedErrorCode).send(Utils.unauthorizedErrorMessage);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, Utils.JWT_SECRET);
  } catch (err) {
    return res.status(Utils.unauthorizedErrorCode).send(Utils.unauthorizedErrorMessage);
  }

  req.user = payload;
  next();
};
