import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import { get_env } from '../lib/get-env';
import { AppJwtPayload } from './authMiddleWare.interface';
import { userModel } from '../models/userModel';
import { roleModel } from '../models/rolesModel';

export async function authMiddleWare(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, get_env.JSON_WEB_TOKEN_SECRET) as unknown as AppJwtPayload;

    const user = await userModel.findOne({ _id: decoded.userId });

    const role = await roleModel.findOne({ _id: user?.roleId });
    if (user) {
      req.user = user;

      const expirationTime = decoded.exp as number;
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpireSoon = expirationTime - currentTime <= 300;

      if (tokenExpireSoon) {
        req.tokenExpireSoon = tokenExpireSoon;
        const token = jwt.sign({ userId: user }, get_env.JSON_WEB_TOKEN_SECRET, {
          expiresIn: get_env.JSON_WEB_TOKEN_EXPIRY,
        });

        res.setHeader('tokenExpireSoon', String(tokenExpireSoon));
        res.setHeader('jwt', token);
      }
    }
    if (role) {
      req.privileges = role;
    }
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}
