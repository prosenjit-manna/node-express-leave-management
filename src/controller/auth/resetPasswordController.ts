import { userModel } from '../../models/userModel';

import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { sendErrorResponse } from '../../lib/sendResponse';
import { sendMail } from '../../lib/mail-service';
import { ResetPasswordRequest } from '../../interface/api/auth/resetPassword/resetPasswordRequest.interface';

export async function resetPasswordController(req: Request, res: Response) {
  try {
    const { token, password } = req.body as unknown as ResetPasswordRequest;
    const user = await userModel.findOne({ passwordResetToken: token });

    if (!user) {
      return sendErrorResponse({ message: 'Invalid Token!', res });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user?.updateOne({ password: hashedPassword, passwordResetToken: null, failedAttempt: 0, lockoutTime: null });

    const html = `
     Your password has been changed!
    
    `;

    if (user) {
      sendMail({ to: user?.username, subject: 'Password change notification!', html });
    }

    res.send({ message: 'Success!' });
  } catch (error) {
    sendErrorResponse({ error, res });
  }
}
