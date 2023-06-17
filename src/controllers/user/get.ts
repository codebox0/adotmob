import {getUser} from '../../services/user.service'
import {Request, Response} from 'express'

export const  get =  async  (req: Request, res: Response) => {
    const { id } = req.params;

    const user =  await getUser(id);

    if (!user) {
        return res.status(404).json({message: `User ${id} not found`});
    }

    return res.status(200).json({data: user});
};
