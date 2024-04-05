import { Role } from '../roles.enum';

export interface UpdateRoleRequest {
  userId: string;
  role: Role;
}
