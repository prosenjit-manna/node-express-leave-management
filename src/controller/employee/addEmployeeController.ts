import { Request, Response } from 'express';
import { sendErrorResponse, sendForbiddenResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { employeeModel } from '../../models/employeeModel';
import { employeeRequestSchema } from '../../interface/api/employee/add-employee/add-employee-request.schema';

export async function addEmployeeController(req: Request, res: Response) {
  if (!req.privileges.employee?.create) {
    return sendForbiddenResponse({ res });
  }

  try {
    employeeRequestSchema.parse(req.body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  try {
    const employee = await employeeModel.create(req.body);
    sendSuccessResponse({ message: 'Employee Added', res, data: employee });
  } catch (error) {
    return sendErrorResponse({ error, res });
  }
}
