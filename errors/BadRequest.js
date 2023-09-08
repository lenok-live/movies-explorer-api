// Ошибка 400: используется в двух ситуациях: 1) тогда, когда пользователь не включил
// в запрос необходимое поле, 2) тогда, когда в запросе содержатся некорректные данные

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
