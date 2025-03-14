const request = require("supertest");
const express = require("express");
const userRouter = require("../routes/userRoutes");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/users", userRouter);

describe("User Authentication Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /users/register - should register a new user", async () => {
    const newUser = {
      username: "testuser",
      phone: "1234567890",
      email: "test@example.com",
      password: "password123",
    };
    const hashedPassword = "hashedpassword123";
    const mockUser = { _id: "1", ...newUser, password: hashedPassword };

    UserModel.findOne.mockResolvedValue(null); // No existing user
    bcrypt.hash.mockResolvedValue(hashedPassword);
    UserModel.create.mockResolvedValue(mockUser);
    jwt.sign.mockReturnValue("mockedToken");

    const response = await request(app).post("/users/register").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ token: "mockedToken", user_id: "1" });
  });

  test("POST /users/register - should return 409 if email is already in use", async () => {
    UserModel.findOne.mockResolvedValue({ email: "test@example.com" });

    const response = await request(app).post("/users/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Email already in use");
  });

  test("POST /users/login - should log in a user", async () => {
    const userCredentials = {
      email: "test@example.com",
      password: "password123",
    };
    const hashedPassword = "hashedpassword123";
    const mockUser = { _id: "1", ...userCredentials, password: hashedPassword };

    UserModel.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockedToken");

    const response = await request(app)
      .post("/users/login")
      .send(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token: "mockedToken", user_id: "1" });
  });

  test("POST /users/login - should return 401 for incorrect password", async () => {
    UserModel.findOne.mockResolvedValue({
      email: "test@example.com",
      password: "hashedpassword123",
    });
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Email or password is incorrect");
  });

  test("POST /users/login - should return 401 if user is not found", async () => {
    UserModel.findOne.mockResolvedValue(null);

    const response = await request(app).post("/users/login").send({
      email: "notfound@example.com",
      password: "password123",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Email or password is incorrect");
  });
});
