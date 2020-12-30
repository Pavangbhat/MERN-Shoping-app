require("dotenv").config();
const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  //TODO : Handle error properly
  if (!errors.isEmpty()) {
    return res.status(422).json({
      Error: errors.array()[0].msg,
    });
  }
  const userData = req.body;
  const user = new User(userData);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        Error: "Unable to create account or account already exists",
        err,
      });
    }
    res.status(200).json(user);
  });
};

exports.signin = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({ Error: error.array()[0].msg });
  }

  const { email, password } = req.body;
  //find the user in database
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      //if email is not found user is going to null
      return res.status(400).json({ Error: "User doesnot exist", err });
    }
    //matching with password
    if (!user.authenticated(password)) {
      return res
        .status(401)
        .json({ Error: "Email and password doesnot match" });
    }

    //saving token in cookie
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
    res.cookie("token", token, { expire: new Date() + 9999 }); //https://www.tutorialspoint.com/expressjs/expressjs_cookies.htm
    const { _id, name, email, role } = user;

    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully signedout" });
};

//Protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.TOKEN_KEY,
  userProperty: "auth",
});

//Custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth._id && req.auth._id == req.profile._id;
  if (!checker) {
    res.status(403).json({ error: "Access denied" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({ error: "Access denied , not admin" });
  }

  next();
};
