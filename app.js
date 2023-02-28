const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Joi, celebrate, errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./errors/errorHandler');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { NOT_FOUND_PAGE } = require('./utils/errors');

const { PORT, MONGODB_URL } = require('./utils/config');

const app = express();
mongoose.connect(MONGODB_URL);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .min(2),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
