import { Request, Response } from 'express';
import { sendErrorResponse, sendForbiddenResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { employeeModel } from '../../models/employeeModel';
import { viewEmployeeRequest, viewEmployeeRequestSchema } from '../../interface/api/employee/view-employee/view-employee-request.schema';

export async function viewEmployeeController(req: Request, res: Response) {
  const body = req.body as viewEmployeeRequest;

  try {
    viewEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  const employee = await employeeModel.findOne({ userId: body.userId });
  const is_document_owner = req.privileges?.employee?.documentOwner?.enabled && req.user._id?.toString() === body.userId;

  // APP_OWNER - Can Read
  // ORG_OWNER - CAN READ
  // USER - Can Read only if user ID match with logged in user ID
  if (is_document_owner || req.privileges.employee?.list?.enabled) {
    return sendSuccessResponse({ res, message: '', data: employee });
  } else {
    return sendForbiddenResponse({ res });
  }
}
