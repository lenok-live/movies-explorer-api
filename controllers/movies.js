const Movie = require('../models/movie');

const MESSAGES = require('../utils/constantsMessage');

const { deletionMovie } = MESSAGES[200].movies;
const { castError } = MESSAGES[400].users;
const { validationError } = MESSAGES[400].movies;
const { forbidden } = MESSAGES[403].movies;
const { notFoundMovie } = MESSAGES[404].movies;

const BadRequest = require('../errors/BadRequest'); // 400
const Forbidden = require('../errors/Forbidden'); // 403
const NotFound = require('../errors/NotFound'); // 404

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
      if (error === 'ValidationError') {
        next(new BadRequest(validationError));
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
        throw new NotFound(notFoundMovie);
      }
      if (`${movie.owner}` !== req.user._id) {
        throw new Forbidden(forbidden);
      } else {
        Movie.deleteOne({ _id: movieId })
          .then(() => {
            res.send({ message: deletionMovie });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(castError));
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
