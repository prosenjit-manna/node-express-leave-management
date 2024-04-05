import { Privileges } from '../apiModel/privilege.interface';
import { Role } from '../apiModel/roles.enum';

export function getPrivileges(role: Role) {
  let privileges: Partial<Privileges> = {};
  if (role === Role.USER) {
    privileges = {
      ...privileges,
      leave: {
        create: true,
        update: { isContentOwner: true },
        list: { isContentOwner: true },
        delete: { isContentOwner: true },
        readonly: false,
      },
    };
  }

  if (role === Role.ADMIN) {
    privileges = {
      ...privileges,
      leave: {
        create: true,
        update: true,
        list: true,
        delete: true,
        readonly: false,
      },
      employee: {
        create: true,
        update: true,
        list: true,
        delete: true,
        readonly: false,
      },
    };
  }

  if (role === Role.OWNER) {
    privileges = {
      ...privileges,
      leave: {
        create: true,
        update: true,
        list: true,
        delete: true,
        readonly: false,
      },
      employee: {
        create: true,
        update: true,
        list: true,
        delete: true,
        readonly: false,
      },
    };
  }

  return privileges;
}
