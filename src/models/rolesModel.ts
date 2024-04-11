import mongoose from 'mongoose';
import { Privilege, PrivilegeDoc, Privileges } from '../interface/data/privilege.interface';

const privilegeDocSchema = new mongoose.Schema<PrivilegeDoc>({
  policy: { type: String },
  enabled: { type: Boolean },
  createdByOnly: { type: Boolean },
});

const privilegeSchema = new mongoose.Schema<Privilege>({
  create: privilegeDocSchema,
  list: privilegeDocSchema,
  delete: privilegeDocSchema,
  update: privilegeDocSchema,
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
