const ClothingItem = require("../models/clothingItem");
const { handleErrors, ERROR_403 } = require("../utils/errors");

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleErrors(req, res, err);
    });
};

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      handleErrors(req, res, err);
    });
};

module.exports.deleteItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      const itemOwner = item.owner.toString();
      if (itemOwner !== req.user._id) {
        res.status(ERROR_403).send({ message: "Forbidden" });
      } else {
        ClothingItem.findByIdAndDelete(req.params.itemId)
          .orFail()
          .then((itemDelete) => {
            res.send({ data: itemDelete });
          })
          .catch((err) => {
            handleErrors(req, res, err);
          });
      }
    })
    .catch((err) => {
      handleErrors(req, res, err);
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
      handleErrors(req, res, err);
    });
};
