import { Response, Request } from 'express';
import { userModel } from '../../models/userModel';
import { sendErrorResponse } from '../../lib/errorResponse';

export async function currentUserController(req: Request, res: Response) {
  console.log(req.userId);
  try {
    if (req.userId) {
      const user = await userModel.findOne({ _id: req.userId });
      res.send(user);
    } else {
      sendErrorResponse({ message: 'User Not Found', res });
    }
  } catch (e: any) {
    sendErrorResponse({ error: e, res });
  }
}
