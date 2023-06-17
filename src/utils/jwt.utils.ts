import jwt from 'jsonwebtoken'
import config from '../config'
import {tokenSchema} from '../dtos/token'
import Joi from 'Joi'
import {NextFunction, Request, Response } from 'express';

export function generateToken(userId: string, firstName: string, lastName: string, options = {}): string {
  const args = { ...options };

  return jwt.sign(
      {
          userId,
          firstName,
          lastName,
          ...args,
      },
      config.jwt.secret,
  );
}

export const readToken = (token: string) => {
  const verified = jwt.verify(token, config.jwt.secret);
  if (typeof verified === 'string') {
    throw new Error('Invalid token');
  }
    return tokenSchema.validate(verified);
}

export const  readTokenPayload = (token: string) => {
  return jwt.decode(token);
}

export const verifyToken = (token: string): boolean  =>{
  try {
    readToken(token);
    return true;
  } catch (_error) {
    return false;
  }
}

export  const validateSchema = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

/**
 * Validate the request body
 * @param schema
 * @param data
 */
export  const validateSchemaData = (schema: Joi.Schema, data: any) => {
    const { error } = schema.validate(data);
    if (error) {
        return error.details[0].message;
    }
    return null;
}

/**
 * Validate the request params
 * @param schema
 */
export  const validateParamSchemaData = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) =>{
    const { error } = schema.validate({id: req.params.id});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}