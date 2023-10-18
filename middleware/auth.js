const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_401, ERROR_400 } = require("../utils/errors");

module.exports.handleAuthError = (req, res, next) => {
  const { authorization } = req.headers;

  // if (!email || !password) {
  //   return res.status(ERROR_400).send({ message: "Invalid Data" });
  // }

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(ERROR_401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(ERROR_401).send({ message: "Invalid Token" });
  }

  req.user = payload; // assigning the payload to the request object
  return next();
};
