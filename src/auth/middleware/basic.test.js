const { signUp, basicAuth } = require("./basic");
const base64 = require("base-64");
const { sequelize } = require("../models");

beforeAll(async () => {
  sequelize.sync();
});

describe("validate signUp", () => {
  it("should take in json user/pass, create new User, next properly called", async () => {
    const req = {
      body: {
        username: "test1",
        passwordHash: "777",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const next = jest.fn();

    await signUp(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

describe("validate basicAuth", () => {
  it("should take in a header with user/pass, User finds one, next properly called", async () => {
    const req = {
      headers: {
        authorization: `basic ${base64.encode("test1:777")}`,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const next = jest.fn();

    await basicAuth(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
