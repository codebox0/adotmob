import Joi from 'Joi'

interface InterestPointDto {
    _id: string,
    name: {
        lat: number,
        lon: number,
        name: string,
        impressions: number,
        clicks: number,
    }
}

export interface InterestPoint {
    lat: number,
    lon: number,
    name: string,
}

export type interestPointInput = {
    lat: Number,
    lon: Number,
    name: string,
}
// export type interestPointInput = {
//     name: {
//         lat: Number,
//         lon: Number,
//         name: string,
//         impressions: number,
//         clicks: number,
//     }
// }

export const interestPointSchema = Joi.object({
    name: {
        lat: Joi.number().precision(8),
        lon: Joi.number().precision(8),
        name: Joi.string().min(0).max(60),
        impressions: Joi.number().min(0),
        clicks: Joi.number().min(0),
    }
});