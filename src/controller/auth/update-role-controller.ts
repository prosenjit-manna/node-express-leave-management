import { Response, Request } from 'express';
import { userModel } from '../../models/userModel';
import { UpdateRoleRequest } from '../../interface/api/update-role/updateRoleRequest.interface';
import { roleModel } from '../../models/rolesModel';
import { UserType } from '../../interface/data/userType.enum';

/**
 * App owner can update to any role
 * Org Owner can update user + org role
 */
export async function updateRoleController(req: Request, res: Response) {
  try {
    if (!req.privileges.role?.update) {
      res.status(403).send({ message: 'Access Denied' });
      return;
    }
    const body = req.body as UpdateRoleRequest;
    const user = await userModel.findOne({ _id: body.userId });
    const role = await roleModel.findOne({ name: body.role });

    if (req.user.userType === UserType.APP_OWNER && req.privileges.role.update) {
      await user?.updateOne({ role: body.role, roleId: role?.id }).where({ _id: body.userId });
      res.status(200).send({ message: 'Updated' });
    } else if (req.user.userType === UserType.ORG_OWNER && req.privileges.role.update) {
      await user?.updateOne({ role: body.role, roleId: role?.id }).where({ _id: body.userId });
      res.status(200).send({ message: 'Updated' });
    } else {
      res.status(200).send({ message: "You don't have access to update" });
    }
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}
