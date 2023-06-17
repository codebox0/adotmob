import Joi from 'Joi'

export interface PlaceDto {
    _id: string,
    address: string,
    phoneNumber: string,
    require_pass_level: number,
    require_age_level: number,
}

export type createPlaceInput = {
    address: String,
    phoneNumber: String,
    require_pass_level: Number,
    require_age_level: Number,
}

export type UpdatePlaceInput = {
    address: String,
    phoneNumber: String,
    require_pass_level: Number,
    require_age_level: Number,
}

export type userPlaceInput = {
    age: Number,
    pass_level: Number,
}

export const createPlaceSchema = Joi.object({
    address: Joi.string().min(0).max(60),
    phoneNumber: Joi.string().min(0).max(60),
    require_pass_level: Joi.number().min(1).max(5),
    require_age_level: Joi.number().min(0).max(120),
});

export const updatePlaceSchema = createPlaceSchema;