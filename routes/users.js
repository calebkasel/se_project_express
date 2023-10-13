const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users");
const { handleAuthError } = require("../middleware/auth");

router.get("/me", handleAuthError, getUser);
router.patch("/me", handleAuthError, updateUser);

module.exports = router;
