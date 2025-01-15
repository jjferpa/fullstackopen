const { describe, test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of listHelper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

describe("Username validations", () => {
  test("Empty username should return 400 status", async () => {
    await api
      .post("/api/users")
      .send(listHelper.userWithoutUsername)
      .expect(400);
  });

  test("Username less than 3 characters should return 400 status", async () => {
    await api
      .post("/api/users")
      .send(listHelper.userWithShortUsername)
      .expect(400);
  });

  test("Repeated Username should return 400 status", async () => {
    const users = await listHelper.usersInDb();
    const userToTest = users[0];

    await api
      .post("/api/users")
      .send({ userToTest, password: "123" })
      .expect(400);
  });
});

describe("Password validations", () => {
  test("Empty password should return 400 status", async () => {
    await api
      .post("/api/users")
      .send(listHelper.userWithoutPassword)
      .expect(400);
  });

  test("Password less than 3 characters should return 400 status", async () => {
    await api
      .post("/api/users")
      .send(listHelper.userWithShortPassword)
      .expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
