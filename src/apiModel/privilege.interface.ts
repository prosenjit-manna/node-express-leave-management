export interface Permission {
  isContentOwner?: boolean;
  isSiteOwner?: boolean;
}

export interface Privilege {
  create: boolean | Permission;
  list: boolean | Permission;
  delete: boolean | Permission;
  update: boolean | Permission;
  readonly: boolean;
}

export interface Privileges {
  employee: Privilege | null;
  leave: Privilege | null;
}
