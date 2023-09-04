const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

// GET /movies Возвращает все сохранённые текущим пользователем фильмы
function getMoviesSavedCurrentUser(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((movie) => {
      res.send(movie);
    }).catch(next);
}

// POST /movies Создаёт фильм с переданными в теле: country, director, duration,
// year, description, image, trailer, nameRU, nameEN thumbnail, movieId
function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((error) => {
      if (error === 'Bad Request') {
        next(new BadRequest('Неподдерживаемый тип данных'));
      } else {
        next(error);
      }
    });
}

// DELETE /movies/_id Удаляет сохранённый фильм по id
function deleteSavedMovie(req, res, next) {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Нет фильма с таким id');
      }
      if (`${movie.owner}` !== req.user._id) {
        throw new Forbidden('Доступ к удалению фильма других пользователей запрещен.');
      } else {
        Movie.deleteOne({ _id: movieId })
          .then(() => {
            res.send({ message: 'Фильм был удален' });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Проблема со значениями идентификатора объекта.'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getMoviesSavedCurrentUser,
  createMovie,
  deleteSavedMovie,
};
