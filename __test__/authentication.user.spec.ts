import request from 'supertest';
import app from '../src/app';
import {generateToken} from '../src/utils/jwt.utils'

const user = {
    firstName: 'John',
    lastName: 'Doe',
}

describe('Authentication', () => {
    it(`allows access to ${user.firstName}`, async () => {
      const res = await request(app)
          .get('/users')
          .set('Authorization', `Bearer ${generateToken('', user.firstName, user.lastName)}`);

      expect(res.status).toEqual(200);
    });
});
