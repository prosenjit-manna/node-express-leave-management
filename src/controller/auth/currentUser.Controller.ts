import { Response, Request } from 'express';
import { sendErrorResponse } from '../../lib/sendResponse';

export async function currentUserController(req: Request, res: Response) {
  try {
    if (req.user._id) {
      res.send({ user: req.user, privileges: req.privileges });
    } else {
      sendErrorResponse({ message: 'User Not Found', res });
    }
  } catch (e: any) {
    sendErrorResponse({ error: e, res });
  }
}
