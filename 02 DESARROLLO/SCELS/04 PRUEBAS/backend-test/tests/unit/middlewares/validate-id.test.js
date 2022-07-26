const { validateId } = require("../../../middlewares/validate-id");
const mongoose = require("mongoose");

describe("validateCategory", () => {
  let req, res, next;
  const exec = () => {
    validateId(req, res, next);
  };
  function expectError(res) {
    expect(res.status).toBe(400);
    expect(res.json).not.toBe("OK");
    expect(res.status).not.toBe(200);
  }

  beforeEach(() => {
    req = { params: {}, body: {} };
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

  it("should return a 400 error if no id is sent", () => {
    exec();
    expectError(res);
  });

  it("should return a 400 error if the id is empty", () => {
    req.params.id = "";
    exec();
    expectError(res);
  });

  it("should return a 400 error if the id is not valid ", () => {
    req.params.id = "123";
    exec();
    expectError(res);
  });

  it("should return a 200 error if the id is a valid ObjectId", () => {
    req.params.id = mongoose.Types.ObjectId();
    exec();
    expect(res.json).toBe("OK");
    expect(res.status).toBe(200);
  });
});
