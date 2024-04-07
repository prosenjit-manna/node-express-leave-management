import { Request, Response } from 'express';
import { userModel } from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { get_env } from '../../lib/get-env';
import { sendErrorResponse } from '../../lib/sendResponse';
import { differenceInMinutes } from 'date-fns';

export async function loginController(req: Request, res: Response) {
  try {
    const { username, password, verificationToken } = req.body;
    const user = await userModel.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user?.emailVerified && !verificationToken) {
      return res.status(401).json({ error: 'Your account is not verified. Please check your mail for verification token' });
    }

    if (verificationToken !== user?.emailVerificationToken && !user?.emailVerified) {
      return res.status(401).json({ error: 'Verification token is incorrect' });
    }

    if (user.lockoutTime && user.failedAttempt === 4) {
      const diffMin = Math.abs(differenceInMinutes(user.lockoutTime, new Date()));
      if (diffMin < 30) {
        return res
          .status(401)
          .json({ error: `Authentication failed. your account has been lockout for 30 min. You can try after ${30 - diffMin} minute` });
      }
    }

    if (!passwordMatch) {
      const attempt = user?.failedAttempt ? user.failedAttempt + 1 : 1;
      await user?.updateOne({ failedAttempt: attempt, lockoutTime: new Date() });
      return res.status(401).json({ error: `Authentication failed. Remaining attempt ${4 - attempt}` });
    }

    await user?.updateOne({ failedAttempt: 0, lockoutTime: null, emailVerified: true });

    const token = jwt.sign({ userId: user._id }, get_env.JSON_WEB_TOKEN_SECRET, {
      expiresIn: get_env.JSON_WEB_TOKEN_EXPIRY,
    });
    res.status(200).json({ token });
  } catch (error) {
    sendErrorResponse({ error, res });
  }
}
