import { Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { employeeModel } from '../../models/employeeModel';
import { EditEmployeeRequest, editEmployeeRequestSchema } from '../../interface/api/employee/edit-employee/editRequest.schema';
import { hasPrivileges } from '../../lib/hasPrivileges';

export async function editEmployeeController(req: Request, res: Response) {
  const body: EditEmployeeRequest = req.body;

  try {
    editEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }
  await hasPrivileges({ permission: 'employee', action: 'edit', res, req });

  try {
    const employee = await employeeModel.findById(body.id);

    if (!employee) {
      return sendErrorResponse({ message: 'User Not found', res });
    }
  } catch (error) {
    sendErrorResponse({ error, res });
  }

  try {
    const employee = await employeeModel.updateOne(body);
    sendSuccessResponse({ message: 'Employee Edit', res, data: employee });
  } catch (error) {
    return sendErrorResponse({ error, res });
  }
}
