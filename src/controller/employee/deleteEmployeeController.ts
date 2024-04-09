import { Request, Response } from 'express';
import { employeeModel } from '../../models/employeeModel';
import { DeleteEmployeeRequest, deleteEmployeeRequestSchema } from '../../interface/api/employee/delete-employee/list-employee-request.schema';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';

export async function deleteEmployeeController(req: Request, res: Response) {
  const body: DeleteEmployeeRequest = req.body;

  try {
    deleteEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  try {
    const row = await employeeModel.find({ userId: body.userId });
    if (row) {
      await employeeModel.findOne({ userId: body.userId }).updateOne({ deletedAt: new Date() });
    } else {
      sendErrorResponse({ res, message: 'Employee Not found' });
    }
    return sendSuccessResponse({ res, message: 'Deleted', data: { id: body.userId } });
  } catch (error) {
    return sendErrorResponse({ res, error });
  }
}
