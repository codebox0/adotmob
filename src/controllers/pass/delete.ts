import {Request, Response} from 'express'
import {deletePass} from '../../services/pass.service'
import {validateSchemaData} from '../../utils/jwt.utils'
import {idSchema} from '../../dtos/id'

export const removePass =  async  (req: Request, res: Response) => {
    const { id } = req.params;

    const validate = validateSchemaData(idSchema, {id});
    if (validate) {
        return res.status(400).json({message: validate});
    }

    const pass =  await deletePass(id);

    if (!pass) {
        return res.status(404).json({message: `Pass ${id} not found`});
    }

    return res.status(200).json({data: pass});

};
