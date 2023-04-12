const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  NOT_FOUND_USER_MESSAGE,
  ALREADY_EXISTS_MESSAGE,
  AUTH_INCORRECT_DATA_MESSAGE,
  INCORRECT_DATA_MESSAGE,

} = require('../utils/errors');

const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET } = require('../utils/config');

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user === null) {
      throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
    } else res.send(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        name,
        password: hash,
      })
        .then((user) => {
          res.send({
            name: user.name,
            email: user.email,
          });
        })
        .catch((error) => {
          if (error.code === 11000) {
            next(new ConflictError(ALREADY_EXISTS_MESSAGE));
          } else if (error.name === 'ValidationError') {
            next(new BadRequestError(INCORRECT_DATA_MESSAGE));
          } else next(error);
        });
    })
    .catch(next);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('password')
    .then((user) => {
      if (user === null) throw new AuthError(AUTH_INCORRECT_DATA_MESSAGE);
      else {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) throw new AuthError(AUTH_INCORRECT_DATA_MESSAGE);
            const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
            res.send({ token });
          })
          .catch(next);
      }
    })
    .catch(next);
};

const patchUserInfo = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    );
    if (user === null) {
      throw new NotFoundError(NOT_FOUND_USER_MESSAGE);
    } else res.send(user);
  } catch (error) {
    if (error.code === 11000) {
      next(new ConflictError(ALREADY_EXISTS_MESSAGE));
    }
    else if (error.name === 'ValidationError') {
      next(new BadRequestError(INCORRECT_DATA_MESSAGE));
    } else next(error);
  }
};

module.exports = {
  getUserInfo,
  patchUserInfo,
  createUser,
  login,
};
