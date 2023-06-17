import { Request, Response } from 'express';
import {getPlaces} from '../../services/place.service'

export const  getAllPlaces = async (req: Request, res: Response) => {
    const places = await getPlaces();
    res.status(200).json({data: places});
}
