const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const createError = require("http-errors");
const { Product } = require("../models/product");
const stripe = require("stripe")(
  "sk_test_51LN2VQG9VZofBzhLnpB0gxAid5MVYeQsKq4NHZiYNjJceojKBMRW1HUjsnnm3pF4mvcbGXW9IsRKWsKQIPLOV9j100sOmnJcTg"
);

async function getAllOrders(_req, res, next) {
  try {
    let orders = await Order.find({})
      .populate("user", "name")
      .sort({ dateOrdered: -1 });
    res.status(200).json(orders);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function getOrderById(req, res, next) {
  try {
    let order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });
    if (!order) {
      return next(createError(404, "Order not found"));
    }
    res.status(200).json(order);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function createOrder(req, res, next) {
  try {
    let orderItemsIds = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );
    let orderItemsIdsResolved = await orderItemsIds;
    let totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemId) => {
        let orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        return orderItem.product.price * orderItem.quantity;
      })
    );
    let totalPriceResolved = totalPrices.reduce((acc, curr) => acc + curr, 0);
    req.body.orderItems = orderItemsIdsResolved;
    req.body.totalPrice = totalPriceResolved;
    let order = new Order(req.body);
    order = await order.save();
    res.status(201).json(order);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function updateOrder(req, res, next) {
  try {
    let order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return next(createError(404, "Order not found"));
    }
    res.status(200).json(order);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function deleteOrder(req, res, next) {
  try {
    let order = await Order.findByIdAndDelete(req.params.id);
    await order.orderItems.forEach(async (orderItem) => {
      await OrderItem.findByIdAndDelete(orderItem);
    });
    if (!order) {
      return next(createError(404, "Order not found"));
    }
    res.status(200).json(order);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function getTotalSales(_req, res, next) {
  try {
    let totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);
    if (!totalSales) {
      return next(createError(404, "Total sales cannot be calculated"));
    }
    res.status(200).json({ totalSales: totalSales.pop().totalsales });
  } catch (err) {
    return next(createError(400, err.message));
  }
}
function getCountOrders(_req, res, next) {
  Order.countDocuments((err, count) => {
    if (err) {
      return next(createError(400, err.message));
    } else {
      res.status(200).json({ count });
    }
  });
}
async function getOrdersByUser(req, res, next) {
  try {
    let orders = await Order.find({ user: req.params.id })
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })
      .sort({ dateOrdered: -1 });
    if (!orders) {
      return next(createError(404, "Orders not found"));
    }
    res.status(200).json(orders);
  } catch (err) {
    return next(createError(400, err.message));
  }
}
async function checkout(req, res, next) {
  try {
    const orderItems = req.body;
    if (!orderItems) {
      return next(createError(404, "No order items found"));
    }
    const lineItems = await Promise.all(
      orderItems.map(async (orderItem) => {
        const product = await Product.findById(orderItem.product);
        return {
          price_data: {
            currency: "pen",
            product_data: { name: product.name },
            unit_amount: product.price * 100,
          },
          quantity: orderItem.quantity,
        };
      })
    );
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://arazevallos.github.io/lambdastoreshop/success",
      cancel_url: "https://arazevallos.github.io/lambdastoreshop/error",
    });
    res.status(200).json({ id: session.id });
  } catch (error) {
    return next(createError(400, error.message));
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getCountOrders,
  getOrdersByUser,
  checkout,
};
// Language: javascript
// Path: controllers\controller-order.js
