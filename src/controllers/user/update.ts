import { Request, Response } from 'express';
import {getUser, updateUser} from '../../services/user.service'
import { UpdateUserInput} from '../../dtos/user'


export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userInput: UpdateUserInput = req.body;

    const user = await getUser(id);

    if (!user) {
        return res.status(404).json({message: `User ${id} not found`});
    }

    // if (!userInput.pass_id) {
    //     return res.status(400).json({message: 'The fields Pass ID are required'});
    // }


    const updatedUser = await updateUser(id, userInput);

    return res.status(200).json({data: updatedUser});
}