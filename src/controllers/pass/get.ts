import {Request, Response} from 'express'
import {readTokenPayload} from '../../utils/jwt.utils'
import {getUserPass} from '../../services/user.service'
import {getPass} from '../../services/pass.service'
import {TokenInput} from '../../dtos/token'

export const get = async (req: Request, res: Response) => {
    const {id} = req.params
    const auth = req.header('authorization')
    const token = auth?.split(' ')[1]
    const payload: TokenInput = await readTokenPayload(token || '') as  TokenInput

    if (payload.userId.length < 4) return res.status(403).json({error: 'You can\'t access this pass'})

    const user = await getUserPass(payload.userId)

    // @ts-ignore
     if (user?.pass_id?._id?.toString() ===  id) {
         const pass = await getPass(id)
         return res.status(200).json({data: pass})
     }

    return res.status(403).json({error: 'You can\'t access this pass,  it\'s not yours'})

}
