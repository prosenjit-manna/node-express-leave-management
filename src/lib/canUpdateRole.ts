import { Privileges } from '../interface/data/privilege.interface';
import { User } from '../interface/data/user.interface';
import { UserType } from '../interface/data/userType.enum';

export function canUpdateRole(currentUser: User, role: Privileges): boolean {
  if (currentUser.userType === UserType.APP_OWNER) {
    return true;
  } else if (currentUser.userType === UserType.ORG_OWNER && (role.type === UserType.ORG_OWNER || role.type === UserType.USER)) {
    return true;
  }
  return false;
}
