import mongoose, { Schema } from 'mongoose';
import { Role } from '../apiModel/roles.enum';
export interface User extends mongoose.Document {
  username: string;
  password: string;
  passwordResetToken?: string;
  failedAttempt?: number;
  lockoutTime?: Date;
  role: Role;
  roleId: Schema.Types.ObjectId;
  _id?: string;
}

// eslint-disable-next-line no-useless-escape
const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmail = function (email: string) {
  // eslint-disable-next-line no-useless-escape
  return re.test(email);
};

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [re, 'Please fill a valid email address'],
  },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, required: true },
  passwordResetToken: { type: String, required: false },
  lockoutTime: { type: Date },
  failedAttempt: { type: Number },
});

export const userModel = mongoose.model<User>('User', userSchema);
