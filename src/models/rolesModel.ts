import mongoose from 'mongoose';

export interface Privilege extends mongoose.Document {
  create?: boolean;
  list?: boolean;
  delete?: boolean;
  update?: boolean;
  documentOwner?: boolean;
}

export interface Privileges extends mongoose.Document {
  name: string;
  type: string;
  employee: Privilege | null;
  leave: Privilege | null;
  role?: Privilege | null;
}

const privilegeSchema = new mongoose.Schema<Privilege>({
  create: { type: Boolean },
  list: { type: Boolean },
  delete: { type: Boolean },
  update: { type: Boolean },
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
  role: privilegeSchema,
});

export const roleModel = mongoose.model('Role', rolesSchema);
