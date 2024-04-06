import mongoose from 'mongoose';

export interface Privilege extends mongoose.Document {
  create: boolean;
  list: boolean;
  delete: boolean;
  update: boolean;
  documentOwner?: boolean;
}

export interface Privileges extends mongoose.Document {
  name: string;
  type: string;
  employee: Privilege | null;
  leave: Privilege | null;
}

const privilegeSchema = new mongoose.Schema<Privilege>({
  create: { type: Boolean, required: true },
  list: { type: Boolean, required: true },
  delete: { type: Boolean, required: true },
  update: { type: Boolean, required: true },
  documentOwner: { type: Boolean },
});

const rolesSchema = new mongoose.Schema<Privileges>({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  employee: {
    type: privilegeSchema,
  },
  leave: {
    type: privilegeSchema,
  },
});

export const roleModel = mongoose.model('Role', rolesSchema);
