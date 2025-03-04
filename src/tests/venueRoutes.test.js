jest.setTimeout(10000);

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Genre = require("../models/genre");
const Location = require("../models/location");
const Venue = require("../models/venue");

let mongoServer;

beforeAll(async () => {
  // Start an in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect to the in-memory MongoDB server for testing
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create some test genres and locations to use in the tests
  const genre = await Genre.create({ name: "Rock" });
  const location = await Location.create({
    name: "New York",
    city: "New York",
  });

  // Store the genre and location IDs for use in tests
  global.genreId = genre._id;
  global.locationId = location._id;
});

afterAll(async () => {
  // Close the Mongoose connection and stop the in-memory MongoDB server
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Venue Routes", () => {
  it("should create a new venue", async () => {
    const res = await request(app).post("/venues").send({
      name: "Madison Square Garden",
      address: "4 Pennsylvania Plaza, New York, NY 10001",
      phone: "212-465-6741", // Example phone
      price: "500", // Example price
      genre: global.genreId, // Pass ObjectId for genre
      location: global.locationId, // Pass ObjectId for location
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Madison Square Garden");
    expect(res.body).toHaveProperty("genre");
    expect(res.body).toHaveProperty("location");
  });

  it("should return an error if required fields are missing", async () => {
    const res = await request(app).post("/venues").send({
      name: "Incomplete Venue",
      // Missing address, phone, price, genre, and location
    });

    expect(res.statusCode).toBe(400); // Bad Request
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("Venue validation failed")
    );
  });
});
