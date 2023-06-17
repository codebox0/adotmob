import {getUser} from '../../services/user.service'
import {Request, Response} from 'express'
import {getUserPlaces} from '../../services/place.service'
import {getPass} from '../../services/pass.service'

export const getPlaceList =  async  (req: Request, res: Response) => {
    const { id } = req.params;

    const user =  await getUser(id);

    if (!user) {
        return res.status(404).json({message: `User ${id} not found`});
    }

    // @ts-ignore
    if (!user.pass_id?.level || !user.age) {
        return res.status(404).json({message: `Pass level or user age not found`});
    }


    const placeList = await getUserPlaces({
        age: user.age,
        // @ts-ignore
        pass_level: user.pass_id.level
    })


    return res.status(200).json({data: placeList});
};
