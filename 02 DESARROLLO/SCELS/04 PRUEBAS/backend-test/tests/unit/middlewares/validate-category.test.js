const { validateCategory } = require("../../../middlewares/validate-category");

describe("validateCategory", () => {
  let req, res, next;
  const exec = () => {
    validateCategory(req, res, next);
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

  describe("validate icon", () => {
    it("should return a 400 error if the icon is a number", () => {
      req.body = { icon: 123 };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the icon is an object", () => {
      req.body = { icon: {} };
      exec();
      expectError(res);
    });
  });

  describe("validate color", () => {
    it("should return a 400 error if the color is an object", () => {
      req.body = { color: {} };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the color is a number", () => {
      req.body = { color: 123 };
      exec();
      expectError(res);
    });
  });

  describe("valid category", () => {
    it("should return a 200 if the category is valid", () => {
      req.body = { name: "test", icon: "test", color: "test" };
      exec();
      expect(res.json).toBe("OK");
      expect(res.status).toBe(200);
    });
  });
});
