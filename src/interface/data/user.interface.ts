import { Schema } from 'mongoose';
import { Role } from './roles.enum';

export interface User {
  _id?: string;
  username: string;
  password: string;
  passwordResetToken?: string;
  failedAttempt?: number;
  lockoutTime?: Date;
  role: Role;
  roleId: Schema.Types.ObjectId;
  emailVerified: boolean;
  emailVerificationToken?: string;
}
