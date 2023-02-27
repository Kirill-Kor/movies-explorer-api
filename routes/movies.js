const router = require('express').Router();

const { saveMovie, getMovies, deleteMovie } = require('../controllers/movies');

const { Joi, celebrate } = require('celebrate');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required().min(2).max(30),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2),
    image: Joi.string().required().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
    trailerLink: Joi.string().required().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
    thumbnail: Joi.string().required().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
    movieId: Joi.string().required().min(2).max(30),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
}), saveMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
