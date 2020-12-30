const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  removeProduct,
  updateProduct,
  getAllProduct,
  getAllUniqueCategories,
} = require("../controllers/product");

// Params
router.param("userId", getUserById);
router.param("productId", getProductById);

// Create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// Read
router.get("/product/getProduct/:productId", getProduct);
router.get("/product/getProduct/:productId/photo", photo);
router.get("/products", getAllProduct);
router.get("/product/categories", getAllUniqueCategories);

// Update
router.put(
  "/product/update/:userId/:productId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// Delete
router.delete(
  "/product/deleteProduct/:userId/:productId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

module.exports = router;
