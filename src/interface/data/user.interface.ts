import { Schema } from 'mongoose';
import { UserType } from './userType.enum';

export interface User {
  _id?: string;
  username: string;
  password: string;
  passwordResetToken?: string;
  failedAttempt?: number;
  lockoutTime?: Date;
  role: string;
  roleId: Schema.Types.ObjectId;
  emailVerified: boolean;
  emailVerificationToken?: string;
  userType: UserType;
}
