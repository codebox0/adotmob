import {Request, Response} from 'express'
import {generateToken} from '../../utils/jwt.utils'
import {getUserByFirstNameAndLastName} from '../../services/user.service'
import {importData} from '../../models/initData'

export const  getToken =  async  (req: Request, res: Response) => {

    const { firstName, lastName  } = req.body;

    const user = await getUserByFirstNameAndLastName(firstName, lastName);

    const token =  generateToken(user?.id || '',  firstName, lastName);

    return res.status(200).json({token});
};

export const initDatabase =  async  (req: Request, res: Response)  => {
    await importData();

    return res.status(200).json({message: 'data retrieved successfully!'});
}
