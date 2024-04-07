import { Response } from 'express';
import { LoginRequest } from '../../apiModel/login/loginRequest.interface';
import { LoginResponse } from '../../apiModel/login/loginResponse.interface';
import { userModel } from '../../models/userModel';
import bcrypt from 'bcrypt';
import { Role } from '../../apiModel/roles.enum';
import { roleModel } from '../../models/rolesModel';

export async function registerController({ body }: { body: LoginRequest }, res: Response) {
  try {
    const { username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = await roleModel.findOne({ name: Role.USER });
    const user = new userModel({ username, password: hashedPassword, role: Role.USER, roleId: role?._id });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' }) as LoginResponse;
  } catch (error: any) {
    res.status(500).json({ error: error.message }) as LoginResponse;
  }
}
