const Category = require("../models/category");

exports.getCategoryById = (req, res, next, categoryId) => {
  Category.findById(categoryId).exec((err, category) => {
    if (err) {
      return res.status(400).json({ Error: "error getting category" });
    }

    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  let category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ Error: "Not able to create category" });
    }
    return res.status(200).json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO categories found",
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  let category = req.category;
  category.name = req.body.name;

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ Error: "error updating category", err });
    }
    return res.json({ Message: "Updated successfully", category });
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({ Error: "error Deleting category" });
    }
    res.json({ Message: "deleted successfully", category });
  });
};
