import { Response } from 'express';
import { LoginRequest } from '../../apiModel/login/loginRequest.interface';
import { LoginResponse } from '../../apiModel/login/loginResponse.interface';
import { UserModel } from '../../models/User';
import bcrypt from 'bcrypt';

export async function registerController({ body }: { body: LoginRequest }, res: Response) {
  try {
    const { username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' }) as LoginResponse;
  } catch (error: any) {
    res.status(500).json({ error: error.message }) as LoginResponse;
  }
}
