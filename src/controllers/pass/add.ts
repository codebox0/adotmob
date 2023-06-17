import {passInput} from '../../dtos/pass'
import {Request, Response} from 'express'
import {addPass} from '../../services/pass.service'

export const  addNewPass =  async  (req: Request, res: Response) => {

    const newPass : passInput = req.body;

    if (!newPass.level) {
        return res.status(400).json({message: 'The fields level are required' });
    }

    const pass =  await addPass(newPass);

    return res.status(201).json({data: pass});
};
