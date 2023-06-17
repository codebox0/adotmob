import request from 'supertest';
import app from '../src/app';
import { generateToken } from '../src/utils/jwt.utils';
import mongoose from 'mongoose'

describe('App Test', () => {
  beforeAll(() => {

  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /random-url', () => {
    it('returns 404', async () => {
      const res = await request(app).get('/random-url');

      expect(res.status).toBe(404);
    });
  });

  describe('GET /secured', () => {
    it('returns 200 if authentication succeeded', async () => {
      const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${generateToken('','user', 'user@gmail.co')}`);

      expect(res.status).toBe(200);
    });
  });
});
