// Сбор логов, логировать 2 типа информации — запросы к серверу и ошибки, которые на нём происходят

const winston = require('winston');
const expressWinston = require('express-winston');

// для создания логгера запросов воспользуемся функцией logger модуля expressWinston
// создадим логгер запросов
const requestLogger = expressWinston.logger({
  // опция transports отвечает за то, куда нужно писать лог
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  // опция — format отвечает за формат записи логов, json удобно анализировать
  format: winston.format.json(),
});

// логгер ошибок создаётся методом errorLogger модуля expressWinston
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
