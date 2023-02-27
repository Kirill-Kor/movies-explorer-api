const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Movies = require('../models/movie');
const {
  INCORRECT_DATA_ERROR_CODE,
  INCORRECT_DATA_MESSAGE,
  NOT_FOUND_STATUS_CODE,
  NOT_FOUND_MOVIE_MESSAGE,
  FORBIDDEN_ERROR_CODE,
  FORBIDDEN_ERROR_MESSAGE,
} = require('../utils/errors');

const getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const saveMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  try {
    let movie = await Movies.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user,
    });
    movie = await movie.populate('owner');
    res.send(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new Error(INCORRECT_DATA_ERROR_CODE, INCORRECT_DATA_MESSAGE));
    } else next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movies.findById(req.params.movieId);
    if (movie === null) throw new NotFoundError(NOT_FOUND_STATUS_CODE, NOT_FOUND_MOVIE_MESSAGE);
    // eslint-disable-next-line eqeqeq
    if (req.user._id != movie.owner) {
      throw new ForbiddenError(FORBIDDEN_ERROR_CODE, FORBIDDEN_ERROR_MESSAGE);
    }

    const movieToDelete = await Movies.findByIdAndRemove(req.params.movieId);
    res.send(movieToDelete);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMovies,
  saveMovie,
  deleteMovie,
};
