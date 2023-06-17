import { Request, Response } from 'express';
import {getPlace, updatePlace} from '../../services/place.service'
import { UpdatePlaceInput} from '../../dtos/place'


export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const placeInput: UpdatePlaceInput = req.body;

    const place = await getPlace(id);

    if (!place) {
        return res.status(404).json({message: `Place ${id} not found`});
    }

    if (!placeInput.address && !placeInput.require_pass_level && !placeInput.require_age_level) {
        return res.status(400).json({message: 'The fields Pass ID are required'});
    }


    const updatedPlace = await updatePlace(id, placeInput);

    return res.status(200).json({data: updatedPlace});
}