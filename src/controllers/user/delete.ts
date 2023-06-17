import {Request, Response} from 'express'
import {deleteUser} from '../../services/user.service'

export const  removeUser =  async  (req: Request, res: Response) => {
    const { id } = req.params;

    const user =  await deleteUser(id);

    if (!user) {
        return res.status(404).json({message: `User ${id} not found`});
    }

    return res.status(200).json({data: user});

};
