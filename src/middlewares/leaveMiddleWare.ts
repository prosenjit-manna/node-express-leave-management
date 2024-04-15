import { Response, NextFunction, Request } from 'express';
import { employeeModel } from '../models/employeeModel';
import { sendErrorResponse, sendForbiddenResponse } from '../lib/sendResponse';
import { EditEmployeeRequest } from '../interface/api/employee/edit-employee/editRequest.schema';
import { DeleteEmployeeRequest } from '../interface/api/employee/delete-employee/delete-employee-request.schema';
import { viewEmployeeRequest } from '../interface/api/employee/view-employee/view-employee-request.schema';
import { AddLeaveRequest } from '../interface/api/leave/add/addLeaveRequest.schema';

export async function leaveMiddleWare(req: Request, res: Response, next: NextFunction) {
  const action = req.path.replace('/', '');

  if (action === 'add') {
    const body: AddLeaveRequest = req.body;
    const is_matched_author = req.user._id?.toString() === body?.userId;
    const is_document_owner = req.privileges?.leave?.create?.createdByOnly && is_matched_author;

    if ((req.privileges.leave?.create?.createdByOnly && is_document_owner) || req.privileges.leave?.create?.enabled) {
      next();
    } else {
      return sendForbiddenResponse({ res });
    }
  } else if (action === 'edit') {
    const body: EditEmployeeRequest = req.body;
    const row = await employeeModel.findOne({ _id: body.id });
    const is_matched_author = req.user._id?.toString() === row?.userId;
    const is_document_owner = req.privileges?.leave?.update?.createdByOnly && is_matched_author;

    if ((req.privileges.leave?.update?.createdByOnly && !is_document_owner) || !req.privileges.leave?.update?.enabled) {
      return sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'delete') {
    const body: DeleteEmployeeRequest = req.body;
    const row = await employeeModel.findOne({ userId: body.userId });
    const is_matched_author = req.user._id?.toString() === row?.userId;

    const is_document_owner = req.privileges?.leave?.delete?.createdByOnly && is_matched_author;

    if ((req.privileges.leave?.delete?.createdByOnly && !is_document_owner) || !req.privileges.leave?.delete?.enabled) {
      return sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'list' || action === 'search-user') {
    if (!req.privileges.leave?.list?.enabled) {
      return sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'view') {
    const body: viewEmployeeRequest = req.body;
    const row = await employeeModel.findOne({ userId: body.employeeId });
    const is_matched_author = req.user._id?.toString() === row?.userId;
    const is_document_owner = req.privileges?.leave?.delete?.createdByOnly && is_matched_author;
    if ((req.privileges.leave?.list?.createdByOnly && !is_document_owner) || !req.privileges.leave?.list?.enabled) {
      return sendForbiddenResponse({ res });
    }
    next();
  } else {
    return sendErrorResponse({ message: 'Not implemented', res });
  }
}
