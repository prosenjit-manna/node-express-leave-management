import { Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { employeeModel } from '../../models/employeeModel';
import { EmployeeRequest, employeeRequestSchema } from '../../interface/api/employee/add-employee/add-employee-request.schema';
import { userModel } from '../../models/userModel';
import { hasPrivileges } from '../../lib/hasPrivileges';

export async function addEmployeeController(req: Request, res: Response) {
  const body: EmployeeRequest = req.body;

  try {
    employeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  await hasPrivileges({ permission: 'employee', action: 'add', res, req });

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
