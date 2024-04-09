import mongoose, { Schema } from 'mongoose';
import { Leave } from '../interface/data/leave.interface';

const leaveSchema = new mongoose.Schema<Leave>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    leaveStart: { type: Date, required: true },
    leaveEnd: { type: Date, required: true },
    count: { type: Number, required: true },
    leaveType: { type: String, required: true },
    status: { type: String },
    approvedBy: { type: Schema.Types.ObjectId },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const leaveModel = mongoose.model('leave', leaveSchema);
