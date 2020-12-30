const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { sortBy } = require("lodash");

// Param
exports.getProductById = (req, res, next, productId) => {
  Product.findById(productId)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.json({ Error: "error in fetching product", err });
      }

      req.product = product;

      next();
    });
};

// ! Read
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ Error: "Error parsing form", err });
    }

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ Error: "some fields are missing" });
    }

    const product = new Product(fields);

    if (file.photo) {
      if (file.photo.size < 3000000) {
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
    }
    product.save({ new: true }, (err, product) => {
      if (err) {
        return res.status(400).json({ error: "Error saving product", err });
      }

      return res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Listing
exports.getAllProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sort = req.query.sort ? req.query.sort : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    // .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ Error: "Error getting products", err });
      }
      return res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, cat) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "Error getting unique category", err });
    }
    return res.json(cat);
  });
};

// Update
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ Error: "Error parsing form", err });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (file.photo.size < 3000000) {
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    product.save({ new: true }, (err, product) => {
      if (err) {
        return res.status(400).json({ Error: "Error updating product", err });
      }

      return res.json(product);
    });
  });
};

// Delete
exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ Error: "Error deleting product", err });
    }
    return res.json({ message: "Successfully deleted", deletedProduct });
  });
};

// Middleware
exports.photo = (req, res) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
};

exports.updateStockAndSold = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -1, sold: 1 } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
