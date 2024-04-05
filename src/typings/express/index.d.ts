import { Role } from "../../apiModel/roles.enum";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      role?: Role
    }
  }
}