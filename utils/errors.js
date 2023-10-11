const ERROR_400 = 400;
const ERROR_401 = 400;
const ERROR_403 = 403;
const ERROR_404 = 404;
const ERROR_409 = 409;
const ERROR_500 = 500;

const handleErrors = (req, res, err) => {
  if (err.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({ message: "No document found" });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(ERROR_400).send({ message: "Invalid Data" });
  }

  if (err.name === "AuthorizationError") {
    return res.status(ERROR_401).send({ message: "No user found" });
  }

  return res
    .status(ERROR_500)
    .send({ message: "An error has occurred on the server" });
};

module.exports = {
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_409,
  ERROR_500,
  handleErrors,
};
