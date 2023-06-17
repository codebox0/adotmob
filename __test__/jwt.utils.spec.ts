import jwt from 'jsonwebtoken';
import {generateToken, readTokenPayload, verifyToken} from '../src/utils/jwt.utils'
import config from '../src/config';
import {TokenInput} from '../src/dtos/token'

describe('jwt utils', () => {
  describe('verify', () => {
    it('fails on invalid token', () => {
      expect(verifyToken('castor')).toBeFalsy();
    });

    it('fails on empty token', () => {
      expect(verifyToken('')).toBeFalsy();
    });

    it('fails on token generated with the wrong secret', () => {
      const token = jwt.sign(
        {
            userId: '',
            firstName: 'john',
            lastName: 'doe',
        },
        'not the right secret',
      );

      expect(verifyToken(token)).toBeFalsy();
    });
  });

  describe('generate', () => {
    it('generates a token', () => {
      const token = generateToken('','john', 'john@doe.co');
      expect(token.length).not.toEqual(0);
      expect(verifyToken(token)).toBeTruthy();
    });

    it('generates a valid token', async () => {
      const firstName = 'john';
      const lastName = 'john@doe.co';
      const token = generateToken('', firstName, lastName);
      const {firstName: readFirstName, lastName: readLastName}: TokenInput = await readTokenPayload(token) as TokenInput;
      expect(readFirstName).toEqual(firstName);
      expect(readLastName).toEqual(lastName);
    });
  });
});
