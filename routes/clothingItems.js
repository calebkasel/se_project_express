const router = require("express").Router();
const { getItems, createItem, deleteItem } = require("../controllers/clothingItems");

router.get("/", getItems);
// router.get("/:itemId", deleteItem);
router.post("/", createItem);

module.exports = router;
