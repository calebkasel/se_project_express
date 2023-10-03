// getItems, deleteItem, createItem

const ClothingItem = require("../models/clothingItem");
const { handleErrors, Error_404, Error_500 } = require("../utils/errors");

module.exports.createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};

module.exports.getItems = (req, res) => {
  console.log("You're in the clothing get items");

  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};

module.exports.deleteItem = (req, res) => {
  ClothingItem.findById();
};
