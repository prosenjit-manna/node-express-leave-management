import { Privileges } from '../apiModel/privilege.interface';
import { Role } from '../apiModel/roles.enum';

export function getPrivileges(role: Role) {
  let privileges: Partial<Privileges> = {
    leave: {
      create: true,
      update: true,
      list: true,
      delete: true,
      readonly: false,
    },
  };

  if (role === Role.ADMIN) {
    privileges = {
      ...privileges,
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
