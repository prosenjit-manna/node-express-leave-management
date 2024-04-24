import { userModel } from '../../models/userModel';

import { Response, Request } from 'express';
import { sendErrorResponse } from '../../lib/sendResponse';
import { sendMail } from '../../lib/mail-service';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ForgetPasswordRequest, forgetPasswordRequest } from '../../interface/api/auth/forgetPassword/forgetPasswordRequest.interface';
import { get_env } from '../../lib/get-env';

export async function forgetPasswordController(req: Request, res: Response) {
  try {
    const { email } = req.body as unknown as ForgetPasswordRequest;
    try {
      forgetPasswordRequest.parse(req.body);
    } catch (error) {
      return sendErrorResponse({ error, res });
    }

    const user = await userModel.findOne({ username: email });

    const passwordResetToken = await bcrypt.hash(uuidv4(), 10);

    await user?.updateOne({ passwordResetToken });

    const html = `
      Follow this link to reset your password <a href="${get_env.RESET_PASSWORD_URL}?token=${passwordResetToken}">Link</a>
    `;

    if (user) {
      try {
        await sendMail({ to: user?.username, subject: 'Forget Password Email', html });
      } catch (error: any) {
        return sendErrorResponse({ message: error, res });
      }
    }

    return res.send({ message: 'Please check your email for password reset link' });
  } catch (error) {
    sendErrorResponse({ error, res });
  }
}
