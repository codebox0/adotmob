import Joi from 'Joi'

export type createUserInput = {
    pass_id: String,
    firstName: String,
    lastName: String,
    age: Number,
    phoneNumber: String,
    address: String,
}
export interface UserDto {
    _id: string,
    pass_id: string,
    firstName: string,
    lastName: string,
    age: number,
    phoneNumber: string,
    address: string,
}

export type UpdateUserInput = {
    pass_id: String,
    firstName: String,
    lastName: String,
    age: Number,
    phoneNumber: String,
    address: String,
}

export const createUserSchema = Joi.object({
    firstName: Joi.string().min(0).max(60),
    lastName: Joi.string().min(0).max(60),
    age: Joi.number().min(0).max(120),
    phoneNumber: Joi.string().min(0).max(60),
    address: Joi.string().min(0).max(60)
})

export const updateUserSchema = createUserSchema.append({
    pass_id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'object Id'),
})
