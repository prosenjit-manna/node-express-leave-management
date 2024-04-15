import { Response, NextFunction, Request } from 'express';
import { employeeModel } from '../models/employeeModel';
import { sendErrorResponse, sendForbiddenResponse } from '../lib/sendResponse';
import { EmployeeRequest } from '../interface/api/employee/add-employee/add-employee-request.schema';
import { EditEmployeeRequest } from '../interface/api/employee/edit-employee/editRequest.schema';
import { DeleteEmployeeRequest } from '../interface/api/employee/delete-employee/delete-employee-request.schema';
import { viewEmployeeRequest } from '../interface/api/employee/view-employee/view-employee-request.schema';

export async function employeeMiddleWare(req: Request, res: Response, next: NextFunction) {
  const action = req.path.replace('/', '');

  if (action === 'add') {
    const body: EmployeeRequest = req.body;
    const is_matched_author = req.user._id?.toString() === body?.userId;
    const is_document_owner = req.privileges?.employee?.create?.createdByOnly && is_matched_author;

    if ((req.privileges.employee?.create?.createdByOnly && !is_document_owner) || !req.privileges.employee?.create?.enabled) {
      return sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'edit') {
    const body: EditEmployeeRequest = req.body;
    const row = await employeeModel.findOne({ _id: body.id });
    const is_matched_author = req.user._id?.toString() === row?.userId;
    const is_document_owner = req.privileges?.employee?.update?.createdByOnly && is_matched_author;

    if ((req.privileges.employee?.update?.createdByOnly && !is_document_owner) || !req.privileges.employee?.update?.enabled) {
      return sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'delete') {
    const body: DeleteEmployeeRequest = req.body;
    const row = await employeeModel.findOne({ userId: body.userId });
    const is_matched_author = req.user._id?.toString() === row?.userId;

    const is_document_owner = req.privileges?.employee?.delete?.createdByOnly && is_matched_author;

    if ((req.privileges.employee?.delete?.createdByOnly && !is_document_owner) || !req.privileges.employee?.delete?.enabled) {
      return sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'list' || action === 'search-user') {
    if (!req.privileges.employee?.list?.enabled) {
      return sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'view') {
    const body: viewEmployeeRequest = req.body;
    const row = await employeeModel.findOne({ userId: body.employeeId });
    const is_matched_author = req.user._id?.toString() === row?.userId;
    const is_document_owner = req.privileges?.employee?.delete?.createdByOnly && is_matched_author;
    if ((req.privileges.employee?.list?.createdByOnly && !is_document_owner) || !req.privileges.employee?.list?.enabled) {
      return sendForbiddenResponse({ res });
    }
    next();
  } else {
    return sendErrorResponse({ message: 'Not implemented', res });
  }
}
