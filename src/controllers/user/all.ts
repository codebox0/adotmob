import { Request, Response } from 'express';
import {getUsers} from '../../services/user.service'
import {readToken} from '../../utils/jwt.utils'

export const  getAllUsers = async (req: Request, res: Response) => {
    // read token from header and split it to get the token value  & verify it with readToken
    // const token = req.headers.authorization.split(' ')[1];

    const auth = req.header('authorization')
    const token = auth?.split(' ')[1]

    // const verified = readToken(token);

    // console.log('verified', verified)


    const users = await getUsers();
    res.status(200).json({data: users});
}
