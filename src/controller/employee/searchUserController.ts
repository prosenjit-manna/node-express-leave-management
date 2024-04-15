import { Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { searchEmployeeRequest, searchEmployeeRequestSchema } from '../../interface/api/employee/search-employee/search-employeeReques.schema';
import { userModel } from '../../models/userModel';

export async function searchUserController(req: Request, res: Response) {
  const body = req.body as searchEmployeeRequest;

  try {
    searchEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  try {
    const user = await userModel.findOne({ username: body.username });

    if (user) {
      return sendSuccessResponse({ res, message: '', data: user });
    } else {
      return sendErrorResponse({ message: 'Employee Not found', res });
    }
  } catch (error) {
    sendErrorResponse({ error, res });
  }
}
