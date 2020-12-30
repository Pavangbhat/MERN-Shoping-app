require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoute = require("./routes/paymentBRoute");
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.DATABASE_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("open", () => {
  console.log("DATABASE SUCESSFULLY CONNECTED");
});
mongoose.connection.on("error", (err) => {
  console.log("DATABASE CONNECTING ERROR ", err);
});

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoute);

// Port and running server
const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Running on port number ${PORT}`);
});
