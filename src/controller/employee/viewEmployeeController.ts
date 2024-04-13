import { Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { employeeModel } from '../../models/employeeModel';
import { viewEmployeeRequest, viewEmployeeRequestSchema } from '../../interface/api/employee/view-employee/view-employee-request.schema';

export async function viewEmployeeController(req: Request, res: Response) {
  const body = req.body as viewEmployeeRequest;

  try {
    viewEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  try {
    const employee = await employeeModel.findOne({ _id: body.employeeId });

    if (employee) {
      return sendSuccessResponse({ res, message: '', data: employee });
    } else {
      sendErrorResponse({ message: 'Employee Not found', res });
    }
  } catch (error) {
    sendErrorResponse({ error, res });
  }
}
