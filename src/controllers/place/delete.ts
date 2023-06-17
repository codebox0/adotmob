import {Request, Response} from 'express'
import {deletePlace} from '../../services/place.service'

export const  removePlace =  async  (req: Request, res: Response) => {
    const { id } = req.params;

    const place =  await deletePlace(id);

    if (!place) {
        return res.status(404).json({message: `Place ${id} not found`});
    }

    return res.status(200).json({data: place});

};
