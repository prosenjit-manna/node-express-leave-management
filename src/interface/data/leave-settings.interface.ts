import { Schema } from 'mongoose';

export interface LeaveSettings {
  cl?: Number;
  sl?: Number;
  el?: Number;
  cOff?: Number;
  mt?: Number;
  p?: Number;
  userId: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  comment?: String;
}
