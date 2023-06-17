import {createPlaceInput} from '../../dtos/place'
import {Request, Response} from 'express'
import {addPlace} from '../../services/place.service'

export const  add =  async  (req: Request, res: Response) => {

    const newPlace : createPlaceInput = req.body;
    if (!newPlace.address ||!newPlace.phoneNumber || !newPlace.address || !newPlace.require_pass_level|| !newPlace.require_age_level ) {
        return res.status(400).json({message: 'The fields phone number address, pass level and age level are required' });
    }

    const place =  await addPlace({...newPlace});

    return res.status(201).json({data: place});
};
