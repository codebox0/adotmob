import Joi from 'Joi'

export interface PassDto{
    _id: string,
    level: number,
    createdAt: Date,
    updatedAt: Date,
}

export type passInput = {
    level: Number,
}

export const passSchema = Joi.object({
    level: Joi.number().min(1).max(5).required(),
});