// Ошибка 404: применяется в тех случаях, когда конечную точку невозможно обнаружить.

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFound;
