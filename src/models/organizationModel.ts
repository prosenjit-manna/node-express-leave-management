import mongoose, { Schema } from 'mongoose';
import { Organization } from '../interface/data/organization.interface';

const organizationSchema = new mongoose.Schema<Organization>(
  {
    name: { type: String, required: true, unique: true },
    contactPerson: { type: Schema.Types.ObjectId, required: true },
    website: { type: String, required: true },
    address: { type: String, required: true },
    leavePolicy: { type: String, required: true },
  },
  { timestamps: true },
);

export const organizationModel = mongoose.model('organization', organizationSchema);
