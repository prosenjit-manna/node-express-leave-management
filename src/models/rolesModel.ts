import mongoose from 'mongoose';
import { Privilege, Privileges } from '../interface/data/privilege.interface';

const privilegeSchema = new mongoose.Schema<Privilege>({
  create: { type: Boolean },
  list: { type: Boolean },
  delete: { type: Boolean },
  update: { type: Boolean },
  documentOwner: { type: Boolean },
});

const rolesSchema = new mongoose.Schema<Privileges>(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String },
    employee: {
      type: privilegeSchema,
    },
    leave: {
      type: privilegeSchema,
    },
    role: privilegeSchema,
  },
  { timestamps: true },
);

export const roleModel = mongoose.model('Role', rolesSchema);
