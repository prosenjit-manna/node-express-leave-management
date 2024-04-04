import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { get_env } from '../../lib/get-env';


export async function loginController(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id }, get_env.JSON_WEB_TOKEN_SECRET, {
      expiresIn: get_env.JSON_WEB_TOKEN_EXPIRY,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}
