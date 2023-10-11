const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users");
const { handleAuth } = require("../middleware/auth");

router.get("/me", handleAuth, getUser);
router.patch("/me", handleAuth, updateUser);

module.exports = router;
