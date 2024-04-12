import { Response } from 'express';
import { LoginRequest } from '../../interface/api/auth/login/loginRequest.interface';
import { userModel } from '../../models/userModel';
import bcrypt from 'bcrypt';
import { roleModel } from '../../models/rolesModel';
import { sendMail } from '../../lib/mail-service';
import { get_env } from '../../lib/get-env';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../../interface/data/userType.enum';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';

export async function registerController({ body }: { body: LoginRequest }, res: Response) {
  try {
    const { username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = await roleModel.findOne({ name: UserType.USER });
    const verificationToken = await bcrypt.hash(uuidv4(), 10);
    const user = new userModel({
      username,
      password: hashedPassword,
      role: role?.name,
      roleId: role?._id,
      emailVerificationToken: verificationToken,
    });
    await user.save();
    sendMail({
      to: username,
      subject: 'Email verification',
      html: `
      Registration is successful.
      Please verify Your email. Please follow this link ${get_env.EMAIL_VERIFICATION_URL}?token=${verificationToken} 
     `,
    });
    return sendSuccessResponse({ message: 'User registered successfully. Please check your email for verification.', res });
  } catch (error: any) {
    return sendErrorResponse({ error, res });
  }
}
