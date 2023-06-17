import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../config';

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
    },
    (payload, done) => done(null, payload),
  ),
);
