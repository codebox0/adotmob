import passport from 'passport';
import Unauthorized from '../errors/unauthorized';
import {RequestHandler} from 'express'
import {verifyToken} from '../utils/jwt.utils'


const INVALID_TOKEN = 'invalid token';
const UNAUTHORIZED = 'you do not have access to this resource';

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 */
export default (): RequestHandler =>
    function handle(req , res, next): void {
        return passport.authenticate('jwt', async (err: unknown, body?: Record<string, unknown>) => {
            if (err || !body) {
                return next(new Unauthorized(UNAUTHORIZED));
            }
            try {
                const token = body.token as string;
                verifyToken(token);
            } catch (_error) {
                console.log('_error: ', _error)
                return next(new Unauthorized(INVALID_TOKEN));
            }

            return next();
        })(req, res, next);
    };
