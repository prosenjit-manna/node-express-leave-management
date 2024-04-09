import { Request, Response } from 'express';
import { sendErrorResponse, sendForbiddenResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { employeeModel } from '../../models/employeeModel';
import { EmployeeRequest, employeeRequestSchema } from '../../interface/api/employee/add-employee/add-employee-request.schema';
import { userModel } from '../../models/userModel';

export async function addEmployeeController(req: Request, res: Response) {
  const body: EmployeeRequest = req.body;

  if (!req.privileges.employee?.create) {
    return sendForbiddenResponse({ res });
  }

  try {
    employeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  try {
    const user = await userModel.findById(body.userId);
    if (!user) {
      return sendErrorResponse({ message: 'User Not found', res });
    }
  } catch (error) {
    sendErrorResponse({ error, res });
  }

  try {
    const employee = await employeeModel.create(body);
    sendSuccessResponse({ message: 'Employee Added', res, data: employee });
  } catch (error) {
    return sendErrorResponse({ error, res });
  }
}
