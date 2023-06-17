import {createPlaceInput, UpdatePlaceInput, userPlaceInput} from '../dtos/place'
import {Place} from '../models/place.model'


const addPlace = async (createPlaceSchema: createPlaceInput) => {
    const place = await Place.create(createPlaceSchema)
    return await place.save()
}

const getPlace = async (id: string) => {
    return await Place.findOne().where('_id').equals(id).exec()
}

const getPlaces = async () => {
    return await Place.find().sort({require_pass_level: 1}).exec()
}


const getUserPlaces = async (userPlace: userPlaceInput) => {
     return await Place.find({
         $and: [
             {require_pass_level: {$lte: userPlace.pass_level}},
             {require_age_level: {$lte: userPlace.age}}
         ]
     })
         .exec()

}

const updatePlace = async (id: string, updatePlaceInput: UpdatePlaceInput) => {
    return Place.findByIdAndUpdate(id, updatePlaceInput, {new: true})
}


const deletePlace = async (id: string) => {
    return Place.findByIdAndDelete(id);
}


export {
    addPlace,
    getPlace,
    getPlaces,
    updatePlace,
    getUserPlaces,
    deletePlace
}