const mongoose = require("mongoose");

const productsIncartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    name: String,
    count: Number,
    price: Number,
  },
  { timestamps: true }
);

const productsIncart = mongoose.model("ProductsIncart", productsIncartSchema);

const orderSchema = new mongoose.Schema(
  {
    products: [productsIncartSchema],
    transcation_id: {
      type: String,
    },
    amount: Number,
    address: {
      type: Object,
      firstName: String,
      lastName: String,
      streetAddress: String,
      locality: String,
      postalCode: Number,
    },
    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Shipped", "Processing", "Deliverd", "Received"],
    },
    update: Date,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { productsIncart, Order };
