// Ошибка 500: применяется тогда, когда запрос, отправленный фронтендом,
// сформирован правильно, но на бэкенде при этом возникла какая-то ошибка.

function errorMiddlewares(err, req, res, next) {
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? 'Внутренняя ошибка сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
}

module.exports = errorMiddlewares;
