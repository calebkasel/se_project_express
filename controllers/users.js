const User = require("../models/user");
const { handleErrors } = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      handleErrors(req, res, err);
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleErrors(req, res, err);
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({email})
    .then((emailFoud))
  bcrypt.hash(req.body.password, )
  User.create({ name, avatar, email, password })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleErrors(req, res, err);
    });
};
