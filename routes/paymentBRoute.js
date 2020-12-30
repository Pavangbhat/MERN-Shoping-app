const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getToken, processPayment } = require("../controllers/paymentBRoute");

router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/payment/barintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
