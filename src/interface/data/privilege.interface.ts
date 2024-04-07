import { UserType } from './userType.enum';

export interface Privilege {
  create?: boolean;
  list?: boolean;
  delete?: boolean;
  update?: boolean;
  documentOwner?: boolean;
}

export interface Privileges {
  name: string;
  type?: UserType;
  employee: Privilege | null;
  leave: Privilege | null;
  role?: Privilege | null;
}
