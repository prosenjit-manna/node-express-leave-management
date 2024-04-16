import { Response, NextFunction, Request } from 'express';
import { employeeModel } from '../models/employeeModel';
import { sendErrorResponse, sendForbiddenResponse } from '../lib/sendResponse';
import { EditEmployeeRequest } from '../interface/api/employee/edit-employee/editRequest.schema';
import { viewEmployeeRequest } from '../interface/api/employee/view-employee/view-employee-request.schema';
import { AddLeaveRequest } from '../interface/api/leave/add/addLeaveRequest.schema';
import { DeleteLeaveRequest } from '../interface/api/leave/delete/deleteLeaveRequest.schema';
import { leaveModel } from '../models/leaveModel';

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

    if ((req.privileges.leave?.create?.createdByOnly && is_document_owner) || req.privileges.leave?.create?.enabled) {
      next();
    } else {
      return sendForbiddenResponse({ res });
    }
  } else if (action === 'delete') {
    const body: DeleteLeaveRequest = req.body;
    const row = await leaveModel.findOne({ _id: body.leaveId });
    const is_matched_author = req.user._id?.toString() === row?.userId?.toString();
    const is_document_owner = req.privileges?.leave?.delete?.createdByOnly && is_matched_author;
    if ((req.privileges.leave?.delete?.createdByOnly && is_document_owner) || req.privileges.leave?.delete?.enabled) {
      next();
    } else {
      return sendForbiddenResponse({ res });
    }
  } else if (action === 'list') {
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
