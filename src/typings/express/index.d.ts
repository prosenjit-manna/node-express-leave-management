import { Privileges } from '../../interface/data/privilege.interface';
import { User } from '../../interface/data/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: User;
      privileges: Privileges;
    }
  }
}
