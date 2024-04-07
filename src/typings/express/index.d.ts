import { Privileges } from '../../apiModel/privilege.interface';
import { User } from '../../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user: User;
      privileges: Privileges;
    }
  }
}
