import mongoose, { Schema } from 'mongoose';
import { LeaveSettings } from '../interface/data/leave-settings.interface';

const leaveSettingsSchema = new mongoose.Schema<LeaveSettings>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    cl: { type: Number },
    sl: { type: Number },
    el: { type: Number },
    cOff: { type: Number },
    mt: { type: Number },
    p: { type: Number },
  },
  { timestamps: true },
);

export const leaveSettingsModel = mongoose.model('organization', leaveSettingsSchema);
