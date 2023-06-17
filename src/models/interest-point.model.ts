import mongoose, {Document, Model, Schema} from 'mongoose'

const PlaceSchema = new Schema({
    address: String,
    phoneNumber: String,
    require_pass_level: Number,
    require_age_level: Number
})

const Place = mongoose.model('Place', PlaceSchema)

export {
    Place
}