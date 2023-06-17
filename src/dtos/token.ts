import Joi from 'Joi';

export const tokenSchema = Joi.object({
  userId: Joi.string().required(),
  firstName: Joi.string().min(0).max(60).required(),
  lastName: Joi.string().min(0).max(60).required(),
});

export const getTokenSchema = Joi.object({
  firstName: Joi.string().min(0).max(60).required(),
  lastName: Joi.string().min(0).max(60).required(),
});


export type TokenInput = {
    userId: string;
    firstName: string;
    lastName: string;
}
