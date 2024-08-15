import request from "supertest";
import app from "../src/index"; // Import your Express app

describe("GET /countries", () => {
  it("should return a list of countries", async () => {
    const response = await request(app).get("/countries");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("countries");
    expect(Array.isArray(response.body.countries)).toBe(true);
  });
});
