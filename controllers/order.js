const { productsIncart, Order } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: "Error at finding order", err });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;

  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({ Error: "Error creating order", err });
    }

    return res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ Error: "Error getting all orders", err });
      }
      return res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    {
      _id: req.body.orderId,
    },
    {
      $set: {
        status: req.body.status,
      },
    }
  ).exec((err, order) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "Error in updating status of order", err });
    }
    return res.json(order);
  });
};
