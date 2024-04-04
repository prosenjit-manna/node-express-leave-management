import { Role } from '../apiModel/roles.enum';

export function getPrivileges(role: Role) {
  let privileges = {
    currentUser: {}
  };

  return privileges;
}
