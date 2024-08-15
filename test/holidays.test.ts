import request from "supertest";
import app from "../src/index"; // Import your Express app

describe("GET /holidays", () => {
  it("should return holidays for a valid country and year", async () => {
    const response = await request(app)
      .get("/holidays")
      .query({ country: "pak", year: "2024" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("holidays");
    expect(Array.isArray(response.body.holidays)).toBe(true);
  });

  it("should return a 400 error if no country or year is provided", async () => {
    const response = await request(app)
      .get("/holidays")
      .query({ year: "2024" }); // Missing country

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
