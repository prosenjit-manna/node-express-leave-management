import { Schema } from 'mongoose';
import { Gender } from './gender';

export interface Employee {
  userId: Schema.Types.ObjectId;
  name: string;
  phone: string;
  gender: Gender;
  dob: Date;
  deletedAt: Date;
}
