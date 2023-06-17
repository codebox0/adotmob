import Joi from 'Joi'

enum EventType {
    IMP = 'imp',
    CLICK = 'click'
}
export interface EventDto {
    _id: string,
    lat: number,
    lon: number,
    event_type: EventType,
}
export interface EventDto {
    _id: string,
    lat: number,
    lon: number,
    event_type: EventType,
}

export type EventInput = {
    lat: Number,
    lon: Number,
    event_type: EventType,
}

export const eventSchema = Joi.object({
    lat: Joi.number().precision(8),
    lon: Joi.number().precision(8),
    event_type: Joi.string().valid(...Object.values(EventType))
        .description('Event type: IMP or CLICK'),
});