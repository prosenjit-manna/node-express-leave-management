import mongoose from 'mongoose';
import { Role } from '../apiModel/roles.enum';
interface User extends mongoose.Document {
  username: string;
  password: string;
  passwordResetToken?: string;
  failedAttempt?: number;
  lockoutTime?: Date;
  role: Role;
  _id: string;
}

// eslint-disable-next-line no-useless-escape
const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateEmail = function (email: string) {
  // eslint-disable-next-line no-useless-escape
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [re, 'Please fill a valid email address'],
  },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true },
  passwordResetToken: { type: String, required: false },
  lockoutTime: { type: Date },
  failedAttempt: { type: Number },
});

export const userModel = mongoose.model<User>('User', userSchema);
