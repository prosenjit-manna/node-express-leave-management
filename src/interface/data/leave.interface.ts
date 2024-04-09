import { Schema } from 'mongoose';
import { LeaveType } from './leaveType.enum';
import { LeaveStatus } from './leaveStatus.enum';

export interface Leave {
  userId: Schema.Types.ObjectId;
  leaveStart: Date;
  leaveEnd: Date;
  count: number;
  leaveType: LeaveType;
  status: LeaveStatus;
  approvedBy: Schema.Types.ObjectId;
}
