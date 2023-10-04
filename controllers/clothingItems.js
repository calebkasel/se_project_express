// getItems, deleteItem, createItem

const ClothingItem = require("../models/clothingItem");
const { handleErrors, Error_403 } = require("../utils/errors");

module.exports.createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
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
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      const itemOwner = item.owner.toString();
      if (itemOwner !== req.user._id) {
        res.status(Error_403).send({ message: "Forbidden" });
      } else {
        ClothingItem.findByIdAndDelete(req.params.itemId)
          .orFail()
          .then((item) => {
            res.send({ data: item });
          })
          .catch((err) => {
            console.error(err);
            handleErrors(req, res, err);
          });
      }
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};
