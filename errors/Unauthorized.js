// Ошибка 401: применяется в том случае, если пользователь ввёл неправильные учётные данные

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'Unauthorized';
  }
}

module.exports = Unauthorized;
