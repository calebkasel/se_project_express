const Error_400 = 400;
const Error_404 = 404;
const Error_500 = 500;

const handleErrors = (req, res, err) => {
  console.log(err.name, "This is the error name");
  console.log(err.message, "This is the error message");

  if (err.name === "DocumentNotFoundError") {
    return res.status(Error_404).send({ message: "No document found" });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(Error_400).send({ message: "Invalid Data" });
  }

  return res
    .status(Error_500)
    .send({ message: "An error has occurred on the server" });
};

module.exports = {
  Error_400,
  Error_404,
  Error_500,
  handleErrors,
};
