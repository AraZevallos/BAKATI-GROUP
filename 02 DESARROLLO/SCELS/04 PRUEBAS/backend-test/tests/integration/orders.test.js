const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models/user");
const { Product } = require("../../models/product");
const { OrderItem } = require("../../models/order-item");
const { Order } = require("../../models/order");

let server;
describe("Orders", () => {
  beforeEach(() => {
    server = require("../../bin/www");
  });
  afterEach(async () => {
    await server.close();
    await Order.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
    await OrderItem.deleteMany({});
    await Category.deleteMany({});
  });

  describe("GET /orders", () => {
    let token, user;
    const exec = async () => {
      return await request(server)
        .get("/api/v1/orders")
        .set("Authorization", "bearer " + token);
    };

    beforeEach(async () => {
      user = new User({
        name: "access",
        email: "access",
        password: "access",
        phone: "982987654",
        isAdmin: true,
      });
      await user.save();
      token = user.generateAuthToken();
      let orders = [
        {
          user: user._id,
          orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
          status: "entregado",
          totalPrice: 100,
          shippingAddress1: "calle 1",
          city: "ciudad1",
          zip: "zip1",
          country: "pais1",
          phone: "telefono1",
        },
        {
          user: user._id,
          orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
          status: "enviado",
          totalPrice: 200,
          shippingAddress1: "calle 2",
          city: "ciudad2",
          zip: "zip2",
          country: "pais2",
          phone: "telefono2",
        },
      ];
      await Order.insertMany(orders);
    });

    it(
      "should return a 401 if client is not logged in",
      () => {
        token = "";
      },
      async () => {
        const res = await exec();
        expect(res.status).toBe(401);
      }
    );

    it("should return a 200 if client is logged in and admin", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it("should return all orders", async () => {
      const res = await exec();
      expect(res.body.length).toBe(2);
      expect(res.body.some((o) => o.status === "entregado")).toBeTruthy();
      expect(res.body.some((o) => o.status === "enviado")).toBeTruthy();
    });
  });

  describe("GET /orders/:id", () => {
    let token, user, id;
    const exec = async () => {
      return await request(server)
        .get("/api/v1/orders/" + id)
        .set("Authorization", "bearer " + token);
    };

    beforeEach(async () => {
      user = new User({
        name: "access",
        email: "access",
        password: "access",
        phone: "982987654",
        isAdmin: true,
      });
      await user.save();
      token = user.generateAuthToken();
      let order = new Order({
        user: user._id.toHexString(),
        orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
        status: "entregado",
        totalPrice: 100,
        shippingAddress1: "calle 1",
        city: "ciudad1",
        zip: "zip1",
        country: "pais1",
        phone: "telefono1",
      });
      await order.save();
      id = order._id.toHexString();
    });

    it(
      "should return a 401 if client is not logged in",
      () => {
        token = "";
      },
      async () => {
        const res = await exec();
        expect(res.status).toBe(401);
      }
    );

    it("should return a 200 if client is logged in and admin", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it("should return a 404 if the order is not found", async () => {
      id = mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return an order", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("name", "access");
      expect(res.body).toHaveProperty("status", "entregado");
      expect(res.body).toHaveProperty("totalPrice", 100);
      expect(res.body).toHaveProperty("shippingAddress1", "calle 1");
      expect(res.body).toHaveProperty("city", "ciudad1");
      expect(res.body).toHaveProperty("zip", "zip1");
      expect(res.body).toHaveProperty("country", "pais1");
      expect(res.body).toHaveProperty("phone", "telefono1");
    });
  });

  describe("POST /orders", () => {
    let token, user, order;
    const exec = async () => {
      return await request(server)
        .post("/api/v1/orders")
        .set("Authorization", "bearer " + token)
        .send(order);
    };

    beforeEach(async () => {
      user = new User({
        name: "access",
        email: "access",
        password: "access",
        phone: "982987654",
        isAdmin: true,
      });
      token = user.generateAuthToken();
      let tempProduct1 = new Product({
        name: "producto1",
        price: 100,
        description: "descripcion1",
        category: mongoose.Types.ObjectId().toHexString(),
        countInStock: 10,
      });
      let tempProduct2 = new Product({
        name: "producto2",
        price: 200,
        description: "descripcion2",
        category: mongoose.Types.ObjectId().toHexString(),
        countInStock: 20,
      });
      await user.save();
      await tempProduct1.save();
      await tempProduct2.save();
      orderItems = [
        { product: tempProduct1._id.toHexString(), quantity: 1 },
        { product: tempProduct2._id.toHexString(), quantity: 2 },
      ];
      order = {
        user: user._id.toHexString(),
        orderItems: orderItems,
        status: "entregado",
        shippingAddress1: "calle 1",
        city: "ciudad1",
        zip: "zip1",
        country: "pais1",
        phone: "telefono1",
      };
    });

    it(
      "should return a 401 if client is not logged in",
      () => {
        token = "";
      },
      async () => {
        const res = await exec();
        expect(res.status).toBe(401);
      }
    );

    it("should return a 201 if client is logged in and admin", async () => {
      const res = await exec();
      expect(res.status).toBe(201);
    });

    it("should return a 400 if order is invalid", async () => {
      order = { orderItems: orderItems };
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should save the order if it is valid", async () => {
      const res = await exec();
      const orderInDb = await Order.findById(res.body._id);
      expect(orderInDb).not.toBeNull();
    });

    it("should return the order if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("status", order.status);
      expect(res.body).toHaveProperty("totalPrice");
      expect(res.body).toHaveProperty(
        "shippingAddress1",
        order.shippingAddress1
      );
      expect(res.body).toHaveProperty("city", order.city);
      expect(res.body).toHaveProperty("zip", order.zip);
      expect(res.body).toHaveProperty("country", order.country);
      expect(res.body).toHaveProperty("phone", order.phone);
    });
  });

  describe("PUT /orders/:id", () => {
    let token, id, status;
    const exec = async () => {
      return await request(server)
        .put("/api/v1/orders/" + id)
        .set("Authorization", "bearer " + token)
        .send({ status });
    };

    beforeEach(async () => {
      token = new User({
        _id: mongoose.Types.ObjectId(),
        isAdmin: true,
      }).generateAuthToken();
      let order = new Order({
        user: mongoose.Types.ObjectId().toHexString(),
        orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
        status: "pendiente",
        totalPrice: 100,
        shippingAddress1: "calle 1",
        city: "ciudad1",
        zip: "zip1",
        country: "pais1",
        phone: "telefono1",
      });
      await order.save();
      id = order._id.toHexString();
      status = "entregado";
    });

    it(
      "should return a 401 if client is not logged in",
      () => {
        token = "";
      },
      async () => {
        const res = await exec();
        expect(res.status).toBe(401);
      }
    );

    it("should return a 400 if the status is invalid", async () => {
      status = " ";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a 404 if the order is not found", async () => {
      id = mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return a 200 if client is logged in and admin", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it("should update the order if it is valid", async () => {
      await exec();
      const orderInDb = await Order.findById(id);
      expect(orderInDb).not.toBeNull();
      expect(orderInDb.status).toBe(status);
    });

    it("should return the order if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("status", status);
    });
  });

  describe("DELETE /orders/:id", () => {
    let token, id;
    const exec = async () => {
      return await request(server)
        .delete("/api/v1/orders/" + id)
        .set("Authorization", "bearer " + token);
    };

    beforeEach(async () => {
      token = new User({
        _id: mongoose.Types.ObjectId(),
        isAdmin: true,
      }).generateAuthToken();
      let order = new Order({
        user: mongoose.Types.ObjectId(),
        orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
        status: "pendiente",
        totalPrice: 100,
        shippingAddress1: "calle 1",
        city: "ciudad1",
        zip: "zip1",
        country: "pais1",
        phone: "telefono1",
      });
      await order.save();
      id = order._id.toHexString();
    });

    it(
      "should return a 401 if client is not logged in",
      () => {
        token = "";
      },
      async () => {
        const res = await exec();
        expect(res.status).toBe(401);
      }
    );

    it("should return a 404 if the order is not found", async () => {
      id = mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return a 400 if invalid id is passed", async () => {
      id = "1";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a 200 if client is logged in and admin", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it("should delete the order if it is valid", async () => {
      await exec();
      const orderInDb = await Order.findById(id);
      expect(orderInDb).toBeNull();
    });
  });

  describe("GET totalSales-ordersByUser", () => {
    let token, user1, user2, order1, order2, id1, id2;
    beforeEach(async () => {
      token = new User({
        _id: mongoose.Types.ObjectId(),
        isAdmin: true,
      }).generateAuthToken();
      user1 = new User({
        name: "access1",
        email: "access1",
        password: "access1",
        phone: "9829876541",
        isAdmin: true,
      });
      user2 = new User({
        name: "access2",
        email: "access2",
        password: "access2",
        phone: "9829876542",
        isAdmin: true,
      });
      await user1.save();
      await user2.save();
      order1 = new Order({
        totalPrice: 100,
        shippingAddress1: "calle 1",
        city: "ciudad1",
        zip: "zip1",
        country: "pais1",
        phone: "telefono1",
        user: user1._id.toHexString(),
        orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
        status: "pendiente",
      });
      order2 = new Order({
        totalPrice: 100,
        shippingAddress1: "calle 2",
        city: "ciudad2",
        zip: "zip2",
        country: "pais2",
        phone: "telefono2",
        user: user2._id.toHexString(),
        orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
        status: "pendiente",
      });
      await order1.save();
      await order2.save();
      id1 = user1._id.toHexString();
      id2 = user2._id.toHexString();
    });

    it("get total sales", async () => {
      const res = await request(server)
        .get("/api/v1/orders/get/totalsales")
        .set("Authorization", "bearer " + token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("totalSales");
    });

    it("get total sales user 1", async () => {
      const res = await request(server)
        .get("/api/v1/orders/get/userorders/" + id1)
        .set("Authorization", "bearer " + token);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it("get total sales user 2", async () => {
      const res = await request(server)
        .get("/api/v1/orders/get/userorders/" + id2)
        .set("Authorization", "bearer " + token);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it("create-checkout-session", async () => {
      let tempCategory = new Category({ name: "Category 1" });
      await tempCategory.save();
      let tempProduct = new Product({
        name: "Product 1",
        description: "description 1",
        countInStock: 1,
        category: tempCategory._id.toHexString(),
        price: 10,
      });
      await tempProduct.save();
      const items = [{ product: tempProduct._id, quantity: 1 }];
      const res = await request(server)
        .post("/api/v1/orders/create-checkout-session")
        .set("Authorization", "bearer " + token)
        .send(items);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id");
    });

    it("create-checkout-session-fail", async () => {
      const res = await request(server)
        .post("/api/v1/orders/create-checkout-session")
        .set("Authorization", "bearer " + token)
        .send([]);
      expect(res.status).toBe(400);
    });
  });

  describe("GET countOrders", () => {
    let token, user1, user2, order1, order2, id1, id2;
    beforeEach(async () => {
      token = new User({
        _id: mongoose.Types.ObjectId(),
        isAdmin: true,
      }).generateAuthToken();
      user1 = new User({
        name: "access1",
        email: "access1",
        password: "access1",
        phone: "9829876541",
        isAdmin: true,
      });
      user2 = new User({
        name: "access2",
        email: "access2",
        password: "access2",
        phone: "9829876542",
        isAdmin: true,
      });
      await user1.save();
      await user2.save();
      order1 = new Order({
        totalPrice: 100,
        shippingAddress1: "calle 1",
        city: "ciudad1",
        zip: "zip1",
        country: "pais1",
        phone: "telefono1",
        user: user1._id.toHexString(),
        orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
        status: "pendiente",
      });
      order2 = new Order({
        totalPrice: 100,
        shippingAddress1: "calle 2",
        city: "ciudad2",
        zip: "zip2",
        country: "pais2",
        phone: "telefono2",
        user: user2._id.toHexString(),
        orderItems: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
        status: "pendiente",
      });
      await order1.save();
      await order2.save();
      id1 = user1._id.toHexString();
      id2 = user2._id.toHexString();
    });
    it("get count orders", async () => {
      const res = await request(server)
        .get("/api/v1/orders/get/count")
        .set("Authorization", "bearer " + token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("count");
    });
  });
});
