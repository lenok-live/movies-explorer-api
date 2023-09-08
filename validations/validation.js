const { celebrate, Joi } = require('celebrate');

const pattern = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9-]{2,}\.([a-zA-Z0-9]{2,})([/a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{2,})?/;

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const registrationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(pattern).required(),
    trailerLink: Joi.string().regex(pattern).required(),
    thumbnail: Joi.string().regex(pattern).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  loginValidation,
  registrationValidation,
  updateProfileValidation,
  createMovieValidation,
  movieIdValidation,
};
