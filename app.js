require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const { errors } = require('celebrate');

// const cors = require('cors');

const { PORT = 4000 } = process.env;
const { DB_ADDRESS } = require('./utils/config');

const errorMiddlewares = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = require('./middlewares/rateLimit');

const routes = require('./routes/index');

const app = express();

// const allowedCors = [
//   'localhost:4000',
// ];

// const corsOptions = {
//   'Access-Control-Allow-Origin': allowedCors,
//   credentials: true,
// };

app.use(helmet());

// app.use(cors(corsOptions));

// подключаемся к серверу mongo
mongoose.connect(DB_ADDRESS);

// преобразует входные данные JSON в переменные, доступные JS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// подключаем логгер запросов
app.use(requestLogger);

// Необходимо первым в цепочке подключить логгер, а затем limiter
app.use(limiter);

// роуты
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(errorMiddlewares);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
