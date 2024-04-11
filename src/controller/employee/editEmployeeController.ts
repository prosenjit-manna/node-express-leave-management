import { Request, Response } from 'express';
import { sendErrorResponse, sendForbiddenResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { employeeModel } from '../../models/employeeModel';
import { EditEmployeeRequest, editEmployeeRequestSchema } from '../../interface/api/employee/edit-employee/editRequest.schema';
import { appLogger, appLoggerLevel } from '../../lib/logger';

export async function editEmployeeController(req: Request, res: Response) {
  const body: EditEmployeeRequest = req.body;

  if (req.privileges.employee?.update?.enabled || req.privileges.employee?.update?.createdByOnly) {
    appLogger.log(appLoggerLevel.info, 'Edit Employee Routes Accessed');
  } else {
    return sendForbiddenResponse({ res });
  }

  if (!req.privileges.employee?.update?.enabled) {
    return sendForbiddenResponse({ res });
  }

  try {
    editEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  try {
    const employee = await employeeModel.findById(body.id);
    const is_document_owner = req.privileges?.employee?.create?.createdByOnly && req.user._id?.toString() === employee?.userId;

    if (!(req.privileges.employee?.update?.createdByOnly && is_document_owner)) {
      return sendForbiddenResponse({ res });
    }

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
