import {getInterestPoint} from '../../services/interest-point.service'
import {Request, Response} from 'express'
import {InterestPoint} from "../../dtos/interest-point";

export const  getInterest =  async  (req: Request, res: Response) => {
    const interestPoint: Array<InterestPoint> = req.body;

    const interestPointResult =  await getInterestPoint(interestPoint);

    if (!interestPointResult) {
        return res.status(404).json({message: `Place not found`});
    }

    return res.status(200).json({data:interestPointResult});
};
