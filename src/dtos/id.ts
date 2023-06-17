import Joi from 'Joi'


export const idSchema = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'object Id'),
})
