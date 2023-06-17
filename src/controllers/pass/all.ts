import { Request, Response } from 'express';
import {getPassList} from '../../services/pass.service'

export const  getAllPass = async (req: Request, res: Response) => {
    const passs = await getPassList();
    res.status(200).json({data: passs});
}
