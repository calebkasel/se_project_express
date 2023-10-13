const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { handleAuthError } = require("../middleware/auth");

router.get("/", getItems);

router.delete("/:itemId", handleAuthError, deleteItem);

router.post("/", handleAuthError, createItem);

router.put("/:itemId/likes", handleAuthError, likeItem);

router.delete("/:itemId/likes", handleAuthError, dislikeItem);

module.exports = router;
