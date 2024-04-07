import { Role } from '../../data/roles.enum';

export interface UpdateRoleRequest {
  userId: string;
  role: Role;
}
