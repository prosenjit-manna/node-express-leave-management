export interface Privilege {
  create?: boolean;
  list?: boolean;
  delete?: boolean;
  update?: boolean;
  documentOwner?: boolean;
}

export interface Privileges {
  name: string;
  employee: Privilege | null;
  leave: Privilege | null;
  role?: Privilege | null;
}
