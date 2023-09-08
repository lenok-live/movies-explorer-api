const movieRouter = require('express').Router();

const { getMoviesSavedCurrentUser, createMovie, deleteSavedMovie } = require('../controllers/movies');

const { createMovieValidation, movieIdValidation } = require('../validations/validation');

// GET /movies Возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/', getMoviesSavedCurrentUser);

// POST /movies Создаёт фильм с переданными в теле: country, director, duration,
// year, description, image, trailer, nameRU, nameEN thumbnail, movieId
movieRouter.post('/', createMovieValidation, createMovie);

// DELETE /movies/_id Удаляет сохранённый фильм по id
movieRouter.delete('/:movieId', movieIdValidation, deleteSavedMovie);

module.exports = movieRouter;
