import {getPlace} from '../../services/place.service'
import {Request, Response} from 'express'

export const  get =  async  (req: Request, res: Response) => {
    const { id } = req.params;

    const place =  await getPlace(id);

    if (!place) {
        return res.status(404).json({message: `Place ${id} not found`});
    }

    return res.status(200).json({data: place});
};
