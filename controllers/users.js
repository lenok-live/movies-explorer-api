const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const MESSAGES = require('../utils/constantsMessage');

const { registrationSuccess } = MESSAGES[201].users;
const { unsupportedType, castError } = MESSAGES[400].users;
const { userNotFound } = MESSAGES[404].users;
const { emailRegistered } = MESSAGES[409].users;

const BadRequest = require('../errors/BadRequest'); // 400
const NotFound = require('../errors/NotFound'); // 404
const Conflict = require('../errors/Conflict'); // 409

const { NODE_ENV, JWT_SECRET } = require('../utils/config');

// POST /signup Создаёт пользователя с переданными в теле email, password и name
function createUser(req, res, next) {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      const user = {
        name,
        email,
        password: hash,
      };
      return User.create(user);
    })
    .then((user) => {
      const { _id } = user;
      res.status(201).send({
        _id,
        name,
        email,
        message: registrationSuccess,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict(emailRegistered));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest(unsupportedType));
        return;
      }
      next(err);
    });
}

// POST /signin Проверяет переданные в теле почту и пароль и возвращает JWT
function login(req, res, next) {
  // Чтобы войти в систему, пользователь отправляет на сервер почту и пароль
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7days' });

      res.send({ token });
    })
    .catch(next);
}

// GET /users/me Возвращает информацию о пользователе (email и имя)
function getUserInformation(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(userNotFound);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(castError));
      } else {
        next(err);
      }
    });
}

// PATCH /users/me Обновляет информацию о пользователе (email и имя)
function updateUserInformation(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw NotFound(userNotFound);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict(emailRegistered));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest(unsupportedType));
      }
      return next(err);
    });
}

module.exports = {
  getUserInformation,
  updateUserInformation,
  createUser,
  login,
};
