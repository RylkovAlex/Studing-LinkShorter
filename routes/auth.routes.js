const { Router } = require("express");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();
const config = require('config');

// обработка роутера /api/auth/register
router.post(
  "/register",
  [
    // промежуточные middleware на валидацию входящих данных:
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      // ошибки валидации:
      const errors = validationResult(req);
      // если они есть, то отвечаю кодом 400
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Ошибка в данных при регистрации!"
        });
      }

      // если норм всё, то пробуем создать нового пользователя:
      const { email, password } = req.body;

      // проверяем наличие в базе такого email и если есть, то возвращаем код 400
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "Уже есть такой юзер" });
      }

      // если такого нет, то регистрируем нового:
      const hashedPassword = await bcript.hash(password, 12); //хэшируем пароль
      const user = new User({
        email,
        password: hashedPassword
      });
      await user.save();

      res.status(201).json({ message: "Пользовательь создан!" });
    } catch (e) {
      res.status(500).json({ message: "что-то не так... :(" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check('email', 'Введите корретный email').normalizeEmail().isEmail(),
    check('password', 'Введите праоль').exists()
  ],
  async (req, res) => {
    try {
      // ошибки валидации:
      const errors = validationResult(req);
      // если они есть, то отвечаю кодом 400
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Ошибка в данных при входе в систему!"
        });
      }

      // если норм всё, то пробуем создать нового пользователя:
      const { email, password } = req.body;

      // проверяем наличие в базе такого email и если нет, то возвращаем код 400
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден!!!" });
      }

      // если нашли, то проверяем пароль:
      const isMatch = await bcript.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          message: 'Неверной пароль, попробуйте ещё раз!!!'
        })
      }

      // если всё ок, то авторизуем юзера:
      // 1. создание токена:
      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'},
      )
      // 2.ответ
      res.json({ token, userId: user.id, message: "Пользователь авторизован!" });
    } catch (e) {
      res.status(500).json({ message: "сорян, но что-то не так... :(" });
    }
  }
);

module.exports = router;
