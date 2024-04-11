import { Request, Response } from 'express';
import { sendErrorResponse, sendForbiddenResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { employeeModel } from '../../models/employeeModel';
import { viewEmployeeRequest, viewEmployeeRequestSchema } from '../../interface/api/employee/view-employee/view-employee-request.schema';
import { hasPrivileges } from '../../lib/hasPrivileges';

export async function viewEmployeeController(req: Request, res: Response) {
  const body = req.body as viewEmployeeRequest;

  try {
    viewEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  await hasPrivileges({ permission: 'employee', action: 'list', res, req });

  try {
    const employee = await employeeModel.findOne({ userId: body.userId });

    // APP_OWNER - Can Read
    // ORG_OWNER - CAN READ
    // USER - Can Read only if user ID match with logged in user ID
    if (employee) {
      return sendSuccessResponse({ res, message: '', data: employee });
    } else {
      return sendForbiddenResponse({ res });
    }
  } catch (error) {
    sendErrorResponse({ error, res });
  }
}
