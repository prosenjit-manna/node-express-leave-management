import mongoose from 'mongoose';
import { Role } from '../apiModel/roles.enum';
interface User extends mongoose.Document {
  username: string;
  password: string;
  role: Role;
  _id: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true },
});

export const UserModel = mongoose.model<User>('User', userSchema);
