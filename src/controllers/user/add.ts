import {createUserInput} from '../../dtos/user'
import {Request, Response} from 'express'
import {addUser} from '../../services/user.service'

export const  add =  async  (req: Request, res: Response) => {

    const newUser : createUserInput = req.body;

    if (!newUser.firstName || !newUser.lastName || !newUser.age || !newUser.phoneNumber || !newUser.address ) {
        return res.status(400).json({message: 'The fields firstName, lastName, pass_id are required' });
    }

    const user =  await addUser(newUser);

    return res.status(201).json({data: user});
};
