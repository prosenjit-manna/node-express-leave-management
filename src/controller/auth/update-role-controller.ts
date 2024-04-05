import { Response, Request } from 'express';
import { Role } from '../../apiModel/roles.enum';
import { UserModel } from '../../models/User';
import { UpdateRoleRequest } from '../../apiModel/update-role/updateRoleRequest.interface';

/**
 * Site owner And Admin can change user role "ADMIN", "USER"
 */
export async function updateRoleController(req: Request, res: Response) {
  try {
    const body = req.body as UpdateRoleRequest;
    const user = await UserModel.findOne({ _id: body.userId });
    if ((req.role === Role.ADMIN || req.role === Role.OWNER) && user?.role !== Role.OWNER) {
      await user?.updateOne({ role: body.role }).where({ _id: body.userId });
      res.status(200).send({ message: 'Updated' });
    } else {
      res.status(403).send({ message: 'Access Denied' });
    }
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}
