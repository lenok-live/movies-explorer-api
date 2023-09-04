const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v), // функция валидации, возвращает булевое зн-е
      message: 'Неправильный формат почты', // сообщение об ошибке, срабатывает, если функция валидации возвращает false.
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // поведение по умолчанию, чтобы база данных не возвращала это поле
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    default: 'Мария',
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

// validator — функция валидации. Она должна возвращать булевое значение.
// message — сообщение об ошибке. Срабатывает в том случае, если функция валидации возвращает false.

// validate: {
//   validator(v) { // validator - функция проверки данных. v - значение свойства age
//       return v >= 18; // если возраст меньше 18, вернётся false
//   },
//   message: 'Вам должно быть больше 18 лет!', // если validator вернёт false, будет message
// }
