const request = require("supertest");
const express = require("express");
const venueRouter = require("../routes/venueRoutes");
const VenueModel = require("../models/venue");

jest.mock("../models/venue");

const app = express();
app.use(express.json());
app.use("/venues", venueRouter);

describe("Venue Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /venues - should return a list of venues", async () => {
    const mockVenues = [
      {
        _id: "1",
        name: "Venue 1",
        address: "Address 1",
        phone: "12345",
        price: "100",
        genre: "Rock",
        location: "NY",
      },
      {
        _id: "2",
        name: "Venue 2",
        address: "Address 2",
        phone: "67890",
        price: "200",
        genre: "Jazz",
        location: "LA",
      },
    ];
    VenueModel.find.mockResolvedValue(mockVenues);

    const response = await request(app).get("/venues");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockVenues);
  });

  test("GET /venues/:venueId - should return a single venue", async () => {
    const mockVenue = {
      _id: "1",
      name: "Venue 1",
      address: "Address 1",
      phone: "12345",
      price: "100",
      genre: "Rock",
      location: "NY",
    };
    VenueModel.findById.mockResolvedValue(mockVenue);

    const response = await request(app).get("/venues/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockVenue);
  });

  test("POST /venues - should create a new venue", async () => {
    const newVenue = {
      name: "Venue 3",
      address: "Address 3",
      phone: "54321",
      price: "150",
      genre: "Pop",
      location: "Chicago",
    };
    const savedVenue = { _id: "3", ...newVenue };
    VenueModel.create.mockResolvedValue(savedVenue);

    const response = await request(app).post("/venues").send(newVenue);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(savedVenue);
  });

  test("PATCH /venues/:venueId - should update a venue", async () => {
    const updatedVenue = {
      _id: "1",
      name: "Updated Venue 1",
      address: "Updated Address 1",
    };
    VenueModel.findByIdAndUpdate.mockResolvedValue(updatedVenue);

    const response = await request(app)
      .patch("/venues/1")
      .send({ name: "Updated Venue 1", address: "Updated Address 1" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedVenue);
  });

  test("DELETE /venues/:venueId - should delete a venue", async () => {
    const deletedVenue = { _id: "1", name: "Venue 1" };
    VenueModel.findByIdAndDelete.mockResolvedValue(deletedVenue);

    const response = await request(app).delete("/venues/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(deletedVenue);
  });
});
