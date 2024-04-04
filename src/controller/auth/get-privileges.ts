import { Request, Response } from 'express';
import { UserModel } from '../../models/User';

export async function getPrivilegesController(req: Request, res: Response) {
  console.log(req.userId);
  if (req.userId) {
    const user = await UserModel.findOne({ _id: req.userId });
    console.log('user', user?.id);
  }

  // const privilege = getPrivileges()
  res.send('Auth get privileges');
}
