//Routes
const categoriesRoutes = require("../routes/categories");
const productsRoutes = require("../routes/products");
const usersRoutes = require("../routes/users");
const ordersRoutes = require("../routes/orders");
const error = require("../middlewares/error");

module.exports = function (app) {
  const api = process.env.API_URL;
  app.use(`${api}/categories`, categoriesRoutes);
  app.use(`${api}/products`, productsRoutes);
  app.use(`${api}/users`, usersRoutes);
  app.use(`${api}/orders`, ordersRoutes);
  app.use(error);
};
