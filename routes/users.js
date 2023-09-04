const userRouter = require('express').Router();

const { getUserInformation, updateUserInformation } = require('../controllers/users');

const { updateProfileValidation } = require('../validations/validation');

// GET /users/me Возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getUserInformation);

// PATCH /users/me Обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', updateProfileValidation, updateUserInformation);

module.exports = userRouter;
