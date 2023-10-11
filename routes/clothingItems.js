const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { handleAuth } = require("../middleware/auth");

router.get("/", getItems);

router.delete("/:itemId", handleAuth, deleteItem);

router.post("/", handleAuth, createItem);

router.put("/:itemId/likes", handleAuth, likeItem);

router.delete("/:itemId/likes", handleAuth, dislikeItem);

module.exports = router;
