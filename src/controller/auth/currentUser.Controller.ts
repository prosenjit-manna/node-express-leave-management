import { Response, Request } from 'express';
import { UserModel } from '../../models/User';

export async function currentUserController(req: Request, res: Response) {
  console.log(req.userId);
  try {
    if (req.userId) {
      const user = await UserModel.findOne({ _id: req.userId });
      res.status(200).send(user);
    } else {
      res.status(500).send({ message: 'User Not Found' });
    }
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}
