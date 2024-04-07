import mongoose, { Schema } from 'mongoose';
import { Leave } from '../interface/data/leave.interface';

const leaveSchema = new mongoose.Schema<Leave>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, unique: true },
    leaveStart: { type: Date, required: true },
    leaveEnd: { type: Date, required: true },
    count: { type: Number, required: true },
    leaveType: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export const leaveModel = mongoose.model('organization', leaveSchema);
