// Ошибка 403: «доступ запрещён. Используется в тех случаях,
// когда пользователю не разрешён доступ к конечной точке.

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
