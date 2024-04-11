import { Request, Response } from 'express';
import { employeeModel } from '../../models/employeeModel';
import { DeleteEmployeeRequest, deleteEmployeeRequestSchema } from '../../interface/api/employee/delete-employee/delete-employee-request.schema';
import { sendErrorResponse, sendForbiddenResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { appLogger, appLoggerLevel } from '../../lib/logger';

export async function deleteEmployeeController(req: Request, res: Response) {
  const body: DeleteEmployeeRequest = req.body;

  if (req.privileges.employee?.delete?.enabled || req.privileges.employee?.delete?.createdByOnly) {
    appLogger.log(appLoggerLevel.info, 'Delete Employee Routes Accessed');
  } else {
    return sendForbiddenResponse({ res });
  }

  try {
    deleteEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  try {
    const row = await employeeModel.findOne({ userId: body.userId });
    const is_document_owner = req.privileges?.employee?.create?.createdByOnly && req.user._id?.toString() === row?.userId;
    if (!(req.privileges.employee?.delete?.createdByOnly && is_document_owner)) {
      return sendForbiddenResponse({ res });
    }

    if (row) {
      await employeeModel.findOne({ userId: body.userId }).updateOne({ deletedAt: new Date() });
    } else {
      return sendErrorResponse({ res, message: 'Employee Not found' });
    }
    return sendSuccessResponse({ res, message: 'Deleted', data: { id: body.userId } });
  } catch (error) {
    return sendErrorResponse({ res, error });
  }
}
