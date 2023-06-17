import { Request, Response } from 'express';
import {getPass, updatePass} from '../../services/pass.service'
import { passInput} from '../../dtos/pass'


export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const passInput: passInput = req.body;

    const pass = await getPass(id);

    if (!pass) {
        return res.status(404).json({message: `Pass ${id} not found`});
    }

    if (!passInput) {
        return res.status(400).json({message: 'The fields level are required'});
    }

    const updatedPass = await updatePass(id, passInput);

    return res.status(200).json({data: updatedPass});
}