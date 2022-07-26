const errorHandler = require("../../../middlewares/error-handler");
const createError = require("http-errors");

describe("validate Error Handler", () => {
  let err, req, res, next;
  beforeEach(() => {
    req = { headers: {}, body: {} };
    res = { status: jest.fn().mockReturnValue({ send: jest.fn() }) };
    next = jest.fn();
  });

  const exec = () => {
    errorHandler(err, req, res, next);
  };

  it("should return a function", () => {
    expect(errorHandler).toBeInstanceOf(Function);
  });

  it("should return a response with status 400", () => {
    err = createError(400, "Bad Request");
    exec();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return a response with status 401", () => {
    err = createError(401, "Unauthorized");
    exec();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should return a response with status 404", () => {
    err = createError(404, "Not Found");
    exec();
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should return a response with status 500", () => {
    err = createError(500, "Internal Server Error");
    exec();
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
