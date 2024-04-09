const supertest = require("supertest");
const { sequelize, User } = require("../src/auth/models");
const { app } = require("../src/server.js");

const request = supertest(app);

beforeAll(async () => {
  await sequelize.sync();
  User.create({
    username: "test",
    passwordHash: "456",
  });
});

afterAll(async () => {
  await sequelize.drop();
});

describe("Server Tests", () => {
  it("should give a status 200 and return'You signed up!!!'", async () => {
    let response = await request.post("/auth/signup").send({
      username: "yoyoG",
      passwordHash: "123",
    });
    expect(response.status).toEqual(200);
    expect(response.text).toEqual("You signed up!!!");
  });
  it("should give status 200 and return 'Welcome to the app!!!'", async () => {
    let response = await request.post("/auth/signin").auth("yoyoG", "123");
    expect(response.status).toEqual(200);
    expect(response.text).toEqual("Welcome to the app!!!");
  });
});
