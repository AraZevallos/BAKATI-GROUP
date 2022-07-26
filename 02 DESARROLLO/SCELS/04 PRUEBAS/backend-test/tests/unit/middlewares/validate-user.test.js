const {
  validateUser,
  validateAuth,
} = require("../../../middlewares/validate-user");

describe("validateUser", () => {
  let req, res, next;
  const exec = () => {
    validateUser(req, res, next);
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

  describe("validate email", () => {
    it("should return a 400 error if the email is required", () => {
      req.body = { name: "user" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the email is empty", () => {
      req.body = { name: "user", email: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the email is a number", () => {
      req.body = { name: "user", email: 123 };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the email is an object", () => {
      req.body = { name: "user", email: {} };
      exec();
      expectError(res);
    });
  });

  describe("validate phone", () => {
    it("should return a 400 error if the phone is required", () => {
      req.body = { name: "user", email: "email" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the phone is empty", () => {
      req.body = { name: "user", email: "email", phone: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the phone is a number", () => {
      req.body = { name: "user", email: "email", phone: 123 };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the phone is an object", () => {
      req.body = { name: "user", email: "email", phone: {} };
      exec();
      expectError(res);
    });
  });

  describe("valid user", () => {
    it("should return a 200 if the user is valid", () => {
      req.body = { name: "user", email: "email", phone: "phone" };
      exec();
      expect(res.status).toBe(200);
      expect(res.json).toBe("OK");
    });
  });
});

describe("validateAuth", () => {
  let req, res, next;
  const exec = () => {
    validateAuth(req, res, next);
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

  describe("validate email", () => {
    it("should return a 400 error if the email is required", () => {
      exec();
      expectError(res);
    });

    it("should return a 400 error if the email is empty", () => {
      req.body = { email: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the email is a number", () => {
      req.body = { email: 123 };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the email is an object", () => {
      req.body = { email: {} };
      exec();
      expectError(res);
    });
  });

  describe("validate password", () => {
    it("should return a 400 error if the password is required", () => {
      req.body = { email: "email" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the password is empty", () => {
      req.body = { email: "email", password: "" };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the password is a number", () => {
      req.body = { email: "email", password: 123 };
      exec();
      expectError(res);
    });

    it("should return a 400 error if the password is an object", () => {
      req.body = { email: "email", password: {} };
      exec();
      expectError(res);
    });
  });

  describe("valid user", () => {
    it("should return a 200 if the user is valid", () => {
      req.body = { email: "email", password: "password" };
      exec();
      expect(res.status).toBe(200);
      expect(res.json).toBe("OK");
    });
  });
});
