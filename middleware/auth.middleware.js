const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => { // next - продолжить выполнение запроса
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // достаём токен из заколовков
    if (!token) {
      return res.status(401).json({ message: "Вы не авторизованы!" });
    }
    const decoded = jwt.verify(token, config.get("jwtSecret")); // декодируем
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Вы не авторизованы!" });
  }
};
