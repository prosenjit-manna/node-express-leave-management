import { Schema } from 'mongoose';

export interface Organization {
  name: string;
  website: string;
  address: string;
  contactPerson: Schema.Types.String;
  leavePolicy: string;
}
