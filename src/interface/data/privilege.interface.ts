import { UserType } from './userType.enum';

export interface PrivilegeDoc {
  policy: string;
  enabled: boolean;
}

export interface Privilege {
  create?: PrivilegeDoc;
  list?: PrivilegeDoc;
  delete?: PrivilegeDoc;
  update?: PrivilegeDoc;
  documentOwner?: PrivilegeDoc;
}

export interface Privileges {
  name: string;
  type?: UserType;
  employee: Privilege | null;
  leave: Privilege | null;
  role?: Privilege | null;
}
