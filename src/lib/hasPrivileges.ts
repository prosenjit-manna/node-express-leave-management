import { Request, Response } from 'express';
import { employeeModel } from '../models/employeeModel';
import { sendForbiddenResponse } from './sendResponse';

export async function hasPrivileges({
  permission,
  action,
  req,
  res,
}: {
  permission: 'leave' | 'employee';
  action: 'add' | 'edit' | 'delete' | 'list';
  req: Request;
  res: Response;
}) {
  const body = req.body;

  if (permission === 'employee') {
    const row = await employeeModel.findOne({ userId: body.userId });
    const is_matched_author = req.user._id?.toString() === row?.userId;
    if (action === 'add') {
      const is_document_owner = req.privileges?.employee?.create?.createdByOnly && is_matched_author;

      if (req.privileges.employee?.create?.createdByOnly && !is_document_owner) {
        return sendForbiddenResponse({ res });
      } else if (!req.privileges.employee?.create?.enabled) {
        return sendForbiddenResponse({ res });
      }
    } else if (action === 'edit') {
      const is_document_owner = req.privileges?.employee?.update?.createdByOnly && is_matched_author;

      if (req.privileges.employee?.update?.createdByOnly && !is_document_owner) {
        return sendForbiddenResponse({ res });
      } else if (!req.privileges.employee?.update?.enabled) {
        return sendForbiddenResponse({ res });
      }
    } else if (action === 'delete') {
      const is_document_owner = req.privileges?.employee?.delete?.createdByOnly && is_matched_author;

      if (req.privileges.employee?.delete?.createdByOnly && !is_document_owner) {
        return sendForbiddenResponse({ res });
      } else if (!req.privileges.employee?.delete?.enabled) {
        return sendForbiddenResponse({ res });
      }
    } else if (action === 'list') {
      if (!req.privileges.employee?.list?.enabled) {
        return sendForbiddenResponse({ res });
      }
    }
  }
}
