const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator(v) { return validator.isEmail(v); },
      message: 'Неверный email',
    },

  },
  password: {
    type: String,
    required: true,
    select: false,

  },
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,

  },
});

module.exports = mongoose.model('user', userSchema);
