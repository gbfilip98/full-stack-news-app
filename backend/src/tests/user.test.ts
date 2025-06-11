import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js'; // My express instance
import dotenv from 'dotenv';

dotenv.config();

describe('User Auth', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || '', {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should not signup without email', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      firstName: 'John',
      lastName: 'Doe',
      password: '123456'
    });

    expect(res.statusCode).toBe(500); // or 400 if validation implemented
  });
});