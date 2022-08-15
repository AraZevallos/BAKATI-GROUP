const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getCountOrders,
  getOrdersByUser,
  getTotalSales,
  checkout,
} = require("../controllers/controller-order");
const {
  validateOrder,
  validateOrderStatus,
  validateOrderCheckout,
} = require("../middlewares/validate-order");
const { validateId } = require("../middlewares/validate-id");

router.get("/", [getAllOrders]);
router.get("/get/count", [getCountOrders]);
router.get("/get/totalsales", [getTotalSales]);
router.get("/get/userorders/:id", [validateId, getOrdersByUser]);
router.get("/:id", [validateId, getOrderById]);
router.post("/create-checkout-session", [validateOrderCheckout, checkout]);
router.post("/", [validateOrder, createOrder]);
router.put("/:id", [validateId, validateOrderStatus, updateOrder]);
router.delete("/:id", [validateId, deleteOrder]);

module.exports = router;
