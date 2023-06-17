import {getUser} from '../../services/user.service'
import {Request, Response} from 'express'
import {getPlace} from '../../services/place.service'

export const checkAccessPlace =  async  (req: Request, res: Response) => {
    const { userId, placeId } = req.body;

    const user =  await getUser(userId);

    const place =  await getPlace(placeId);

    if (!user) {
        return res.status(404).json({message: `User ${userId} not found`});
    }

    if (!user) {
        return res.status(404).json({message: `Place ${placeId} not found`});
    }

    // @ts-ignore
    const canAccess = place.require_pass_level <= user.pass_id.level && place.require_age_level <= user.age;

    return res.status(200).json({accessible: canAccess});
};
