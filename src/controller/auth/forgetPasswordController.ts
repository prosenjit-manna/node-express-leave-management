import { ForgetPasswordRequest } from '../../apiModel/forgetPassword/forgetPasswordRequest.interface';
import { userModel } from '../../models/userModel';

import { Response, Request } from 'express';
import { sendErrorResponse } from '../../lib/errorResponse';
import { sendMail } from '../../lib/mail-service';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function forgetPasswordController(req: Request, res: Response) {
  try {
    const { email } = req.body as unknown as ForgetPasswordRequest;
    const user = await userModel.findOne({ username: email });

    const passwordResetToken = await bcrypt.hash(uuidv4(), 10);

    await user?.updateOne({ passwordResetToken });

    const html = `
      <b>${passwordResetToken}</b>
    
    `;

    if (user) {
      sendMail({ to: user?.username, subject: 'Forget Password Email', html });
    }

    res.send({ message: 'Please check your email for password reset link' });
  } catch (error) {
    sendErrorResponse({ error, res });
  }
}
