import { userModel } from '../../models/User';

import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { sendErrorResponse } from '../../lib/errorResponse';
import { sendMail } from '../../lib/mail-service';
import { ResetPasswordRequest } from '../../apiModel/resetPassword/resetPasswordRequest.interface';

export async function resetPasswordController(req: Request, res: Response) {
  try {
    const { token, password } = req.body as unknown as ResetPasswordRequest;
    const user = await userModel.findOne({ passwordResetToken: token });

    if (!user) {
      sendErrorResponse({ message: 'Invalid Token!', res });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user?.updateOne({ password: hashedPassword, passwordResetToken: null });

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
