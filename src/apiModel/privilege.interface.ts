export interface Privilege {
  create: boolean;
  list: boolean;
  delete: boolean;
  update: boolean;
  documentOwner?: boolean;
}

export interface Privileges {
  name: string;
  type: string;
  employee: Privilege | null;
  leave: Privilege | null;
}
