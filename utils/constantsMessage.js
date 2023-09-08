const MESSAGES = {
  200: {
    movies: {
      deletionMovie: 'Фильм был успешно удален',
    },
  },

  201: {
    users: {
      registrationSuccess: 'Пользователь успешно зарегистрирован',
    },
  },

  400: {
    users: {
      castError: 'Проблема со значениями идентификатора пользователя',
      unsupportedType: 'Неподдерживаемый тип данных. Проверьте правильность ввода данных.',
    },

    movies: {
      validationError: 'Неподдерживаемый тип данных. Проверьте правильность ввода данных.',
    },
  },

  403: {
    movies: {
      forbidden: 'Доступ к удалению фильма других пользователей запрещен.',
    },
  },

  404: {
    users: {
      userNotFound: 'Запрашиваемый пользователь не найден',
    },

    movies: {
      notFoundMovie: 'Нет фильма по указанному id',
    },
  },

  409: {
    users: {
      emailRegistered: 'Данный email уже зарегистрирован',
    },
  },
};

module.exports = MESSAGES;
