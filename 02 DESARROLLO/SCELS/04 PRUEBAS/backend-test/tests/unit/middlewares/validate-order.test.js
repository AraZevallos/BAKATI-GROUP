const mongoose = require("mongoose");
const {
  validateOrder,
  validateOrderStatus,
  validateOrderCheckout,
} = require("../../../middlewares/validate-order");

describe("validateOrder", () => {
  let req, res, next;
  const exec = () => {
    validateOrder(req, res, next);
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

  describe("validate shippingAddress1", () => {
    it("should return a 400 error if shippingAddress1 is empty", () => {
      req.body = { shippingAddress1: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if shippingAddress1 is undefined", () => {
      req.body = {};
      exec();
      expectError(res);
    });

    it("should return a 400 error if shippingAddress1 is null", () => {
      req.body = { shippingAddress1: null };
      exec();
      expectError(res);
    });

    it("should return a 400 error if shippingAddress1 is not a string", () => {
      req.body = { shippingAddress1: 123 };
      exec();
      expectError(res);
    });
  });

  describe("validate city", () => {
    it("should return a 400 error if city is empty", () => {
      req.body = { shippingAddress1: "address1", city: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if city is undefined", () => {
      req.body = { shippingAddress1: "address1" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if city is null", () => {
      req.body = { shippingAddress1: "address1", city: null };
      exec();
      expectError(res);
    });

    it("should return a 400 error if city is not a string", () => {
      req.body = { shippingAddress1: "address1", city: 123 };
      exec();
      expectError(res);
    });
  });

  describe("validate zip", () => {
    it("should return a 400 error if zip is empty", () => {
      req.body = { shippingAddress1: "address1", city: "city", zip: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if zip is undefined", () => {
      req.body = { shippingAddress1: "address1", city: "city" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if zip is null", () => {
      req.body = { shippingAddress1: "address1", city: "city", zip: null };
      exec();
      expectError(res);
    });

    it("should return a 400 error if zip is not a string", () => {
      req.body = { shippingAddress1: "address1", city: "city", zip: 123 };
      exec();
      expectError(res);
    });
  });

  describe("validate country", () => {
    it("should return a 400 error if country is empty", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "",
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if country is undefined", () => {
      req.body = { shippingAddress1: "address1", city: "city", zip: "zip" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if country is null", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: null,
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if country is not a string", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: 123,
      };
      exec();
      expectError(res);
    });
  });

  describe("validate phone", () => {
    it("should return a 400 error if phone is empty", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "",
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if phone is undefined", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if phone is null", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: null,
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if phone is not a string", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: 123,
      };
      exec();
      expectError(res);
    });
  });

  describe("validate status", () => {
    it("should return a 400 error if status is empty", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
        status: "",
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if status is undefined", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if status is null", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
        status: null,
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if status is not a string", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
        status: 123,
      };
      exec();
      expectError(res);
    });
  });

  describe("validate userId", () => {
    it("should return a 400 error if userId is empty", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
        status: "status",
        user: "",
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if userId is undefined", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
        status: "status",
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if userId is null", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
        status: "status",
        user: null,
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if userId is not a string", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
        status: "status",
        user: 123,
      };
      exec();
      expectError(res);
    });

    it("should return a 400 error if userId is not a valid user", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
        status: "status",
        user: "123",
      };
      exec();
      expectError(res);
    });
  });

  describe("valid order", () => {
    it("should return a 200 response if all fields are valid", () => {
      req.body = {
        shippingAddress1: "address1",
        city: "city",
        zip: "zip",
        country: "country",
        phone: "phone",
        status: "status",
        user: mongoose.Types.ObjectId().toHexString(),
      };
      exec();
      expect(res.status).toBe(200);
      expect(res.json).toBe("OK");
    });
  });
});

describe("validateOrderStatus", () => {
  let req, res, next;
  const exec = () => {
    validateOrderStatus(req, res, next);
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

  describe("validate status", () => {
    it("should return a 400 error if status is empty", () => {
      req.body = { status: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if status is undefined", () => {
      req.body = {};
      exec();
      expectError(res);
    });

    it("should return a 400 error if status is null", () => {
      req.body = { status: null };
      exec();
      expectError(res);
    });

    it("should return a 400 error if status is not a string", () => {
      req.body = { status: 123 };
      exec();
      expectError(res);
    });

    it("should return a 400 error if status is not a valid status", () => {
      req.body = { status: "invalid" };
      exec();
      expectError(res);
    });

    it("should return a 200 response if status is valid", () => {
      req.body = { status: "pendiente" };
      exec();
      expect(res.status).toBe(200);
      expect(res.json).toBe("OK");
    });
  });
});

describe("validateOrderCheckout", () => {
  let req, res, next;
  const exec = () => {
    validateOrderCheckout(req, res, next);
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

  describe("validate Items", () => {
    it("should return a 400 error if items is empty", () => {
      exec();
      expectError(res);
    });

    it("should return a 400 error if items are malformed", () => {
      req.body = { items: [{}] };
      exec();
      expectError(res);
    });

    it("should return a 200 response if items are valid", () => {
      req.body = [
        { product: mongoose.Types.ObjectId().toHexString(), quantity: 1 },
        { product: mongoose.Types.ObjectId().toHexString(), quantity: 1 },
      ];
      exec();
      expect(res.status).toBe(200);
      expect(res.json).toBe("OK");
    });
  });
});
