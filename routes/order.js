const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById, pushOderInPurchaseList } = require("../controllers/user");
const { updateStockAndSold } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
} = require("../controllers/order");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOderInPurchaseList,
  updateStockAndSold,
  createOrder
);

// Read
router.get(
  "/order/getAllOrder/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// Order status
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

//Update order status
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
