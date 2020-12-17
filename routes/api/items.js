const router = require("express").Router();
const Item = require("../../models/Item");

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */

let items = [
  { id: 1, name: "ko ko" },
  { id: 2, name: "ko ko" },
];

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: "desc" })
    .then((items) => res.json(items));
});

/**
 * @route   POST api/items
 * @desc    Create An Item
 * @access  Private
 */

router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

/**
 * @route   DELETE api/items
 * @desc    DELETE An Item
 * @access  Private
 */

router.delete("/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((error) => res.status(404).json({ success: false }));
});

module.exports = router;
