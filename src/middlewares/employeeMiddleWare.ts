import { Response, NextFunction, Request } from 'express';
import { employeeModel } from '../models/employeeModel';
import { sendForbiddenResponse } from '../lib/sendResponse';
import { EmployeeRequest } from '../interface/api/employee/add-employee/add-employee-request.schema';
import { EditEmployeeRequest } from '../interface/api/employee/edit-employee/editRequest.schema';
import { DeleteEmployeeRequest } from '../interface/api/employee/delete-employee/delete-employee-request.schema';

export async function employeeMiddleWare(req: Request, res: Response, next: NextFunction) {
  const action = req.path.replace('/', '');

  if (action === 'add') {
    const body: EmployeeRequest = req.body;
    const row = await employeeModel.findOne({ userId: body.userId });
    const is_matched_author = req.user._id?.toString() === row?.userId;
    const is_document_owner = req.privileges?.employee?.create?.createdByOnly && is_matched_author;

    if ((req.privileges.employee?.create?.createdByOnly && !is_document_owner) || !req.privileges.employee?.create?.enabled) {
      sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'edit') {
    const body: EditEmployeeRequest = req.body;
    const row = await employeeModel.findOne({ _id: body.id });
    const is_matched_author = req.user._id?.toString() === row?.userId;
    const is_document_owner = req.privileges?.employee?.update?.createdByOnly && is_matched_author;

    if ((req.privileges.employee?.update?.createdByOnly && !is_document_owner) || !req.privileges.employee?.update?.enabled) {
      sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'delete') {
    const body: DeleteEmployeeRequest = req.body;
    const row = await employeeModel.findOne({ userId: body.userId });
    const is_matched_author = req.user._id?.toString() === row?.userId;

    const is_document_owner = req.privileges?.employee?.delete?.createdByOnly && is_matched_author;

    if ((req.privileges.employee?.delete?.createdByOnly && !is_document_owner) || !req.privileges.employee?.delete?.enabled) {
      sendForbiddenResponse({ res });
    }
    next();
  } else if (action === 'list') {
    if (!req.privileges.employee?.list?.enabled) {
      sendForbiddenResponse({ res });
    }
    next();
  }
}
