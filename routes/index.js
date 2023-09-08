const router = require('express').Router();

const userRouter = require('./users');
const moviesRouter = require('./movies');

const NotFound = require('../errors/NotFound');

const auth = require('../middlewares/auth');

const { login, createUser } = require('../controllers/users');

const { loginValidation, registrationValidation } = require('../validations/validation');

// Создаёт пользователя с переданными в теле email, password и name
router.post('/signup', registrationValidation, createUser);

// проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', loginValidation, login);

// авторизация
router.use(auth);

// роуты, которым авторизация нужна
router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

module.exports = router;
