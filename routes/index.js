const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { createUser, login } = require("../controllers/users");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", user);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Router not found" });
});

module.exports = router;
