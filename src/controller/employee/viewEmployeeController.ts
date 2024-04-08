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

  if ((req.privileges?.employee?.documentOwner && req.user._id?.toString() === body.userId) || req.privileges.employee?.list) {
    return sendSuccessResponse({ res, message: '', data: employee });
  } else {
    return sendForbiddenResponse({ res });
  }
}
