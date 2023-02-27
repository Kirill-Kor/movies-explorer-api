const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getUserInfo, patchUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().min(2).max(30),
  }),
}), patchUserInfo);

module.exports = router;
