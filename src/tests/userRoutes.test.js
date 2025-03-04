jest.setTimeout(10000);

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const genre = await Genre.create({ name: "Rock" });
  const location = await Location.create({ name: "New York" });

  global.genreId = genre._id;
  global.locationId = location._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Registration & Login", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user_id");
  });

  it("should not allow duplicate email registration", async () => {
    const res = await request(app).post("/users/register").send({
      username: "anotheruser",
      email: "test@example.com",
      password: "newpassword123",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty("message", "Email already in use");
  });

  it("should login with correct credentials", async () => {
    const res = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should reject login with incorrect credentials", async () => {
    const res = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "wrongpassword123",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty(
      "message",
      "Email or password is incorrect"
    );
  });

  it("should reject login if the email does not exist", async () => {
    const res = await request(app).post("/users/login").send({
      email: "nonexistent@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty(
      "message",
      "Email or password is incorrect"
    );
  });
});
