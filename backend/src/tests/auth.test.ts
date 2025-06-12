import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import dotenv from "dotenv";

dotenv.config();

describe("User Auth", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || "", {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("Should not register without email", async () => {
    const res = await request(app).post("/auth/register").send({
      firstName: "John",
      lastName: "Doe",
      password: "Asdfghjkl",
    });

    expect(res.statusCode).toBe(400);
  });
});
