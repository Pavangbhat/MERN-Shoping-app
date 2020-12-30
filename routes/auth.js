const { check } = require("express-validator");

const express = require("express");
var router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("password")
      .isLength({ min: 5 })
      .withMessage("password must be greater then 4 character"),
    check("email").isEmail().withMessage("Email invaild"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("password")
      .isLength({ min: 5 })
      .withMessage("password must be greater then 5 characters"),
    check("email").isEmail().withMessage("Invalid email or user dont exits"),
  ],
  signin
);

router.post("/signout", signout);

module.exports = router;
