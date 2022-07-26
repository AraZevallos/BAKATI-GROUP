const { validateProduct } = require("../../../middlewares/validate-product");
const mongoose = require("mongoose");

describe("validateProduct", () => {
  let req, res, next;
  const exec = () => {
    validateProduct(req, res, next);
  };
  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = (error) => {
      if (error) {
        res.status = error.status;
        res.json = error.message;
      } else {
        res.status = 200;
        res.json = "OK";
      }
    };
  });
  const expectError = (res) => {
    expect(res.status).toBe(400);
    expect(res.json).not.toBe("OK");
    expect(res.status).not.toBe(200);
  };

  describe("validate name", () => {
    it("should return a 400 error if the name is required", () => {
      exec();
      expectError(res);
    });

    it("should return a 400 error if the name is empty", () => {
      req.body = { name: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the name is a number", () => {
      req.body = { name: 123 };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the name is an object", () => {
      req.body = { name: {} };
      exec();
      expectError(res);
    });
  });

  describe("validate description", () => {
    it("should return a 400 error if the description is required", () => {
      req.body = { name: "product" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the description is empty", () => {
      req.body = { name: "product", description: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the description is a number", () => {
      req.body = { name: "product", description: 123 };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the description is an object", () => {
      req.body = { name: "product", description: {} };
      exec();
      expectError(res);
    });
  });

  describe("validate category", () => {
    it("should return a 400 error if the category is required", () => {
      req.body = { name: "product", description: "description" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the category is empty", () => {
      req.body = { name: "product", description: "description", category: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the category is a number", () => {
      req.body = { name: "product", description: "description", category: 123 };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the category is an object", () => {
      req.body = { name: "product", description: "description", category: {} };
      exec();
      expectError(res);
    });
  });

  describe("validate countInStock", () => {
    it("should return a 400 error if the countInStock is required", () => {
      req.body = {
        name: "product",
        description: "description",
        category: mongoose.Types.ObjectId().toHexString(),
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the countInStock is a string", () => {
      req.body = {
        name: "product",
        description: "description",
        category: mongoose.Types.ObjectId().toHexString(),
        countInStock: "string",
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the countInStock is negative", () => {
      req.body = {
        name: "product",
        description: "description",
        category: mongoose.Types.ObjectId().toHexString(),
        countInStock: -1,
      };
      exec();
      expectError(res);
    });
  });

  describe("validate price", () => {
    it("should return a 400 error if the price is required", () => {
      req.body = {
        name: "product",
        description: "description",
        category: mongoose.Types.ObjectId().toHexString(),
        countInStock: 1,
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the price is a string", () => {
      req.body = {
        name: "product",
        description: "description",
        category: mongoose.Types.ObjectId().toHexString(),
        countInStock: 1,
        price: "string",
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the price is negative", () => {
      req.body = {
        name: "product",
        description: "description",
        category: mongoose.Types.ObjectId().toHexString(),
        countInStock: 1,
        price: -1,
      };
      exec();
      expectError(res);
    });
  });

  describe("validate product", () => {
    it("should return a 200 if the all fields are valid", () => {
      req.body = {
        name: "product",
        description: "description",
        category: mongoose.Types.ObjectId().toHexString(),
        countInStock: 1,
        price: 1,
      };
      exec();
      expect(res.json).toBe("OK");
      expect(res.status).toBe(200);
    });
  });
});
