import { Schema } from 'mongoose';

export interface LeaveSettings {
  userId: Schema.Types.ObjectId;
  cl?: Number;
  sl?: Number;
  el?: Number;
  cOff?: Number;
  mt?: Number;
  p?: Number;
}
