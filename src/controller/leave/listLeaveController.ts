import { Request, Response } from 'express';
import { ListLeaveRequest, listLeaveRequestSchema } from '../../interface/api/leave/list/listLeaveRequest.schema';
import { sendErrorResponse } from '../../lib/sendResponse';
import { getPaginatedData } from '../../lib/getPaginatatedData';
import { leaveModel } from '../../models/leaveModel';

export async function listLeaveController(req: Request, res: Response) {
  const body: ListLeaveRequest = req.body;
  const leavePrivilege = req.privileges.leave;

  try {
    listLeaveRequestSchema.parse(req.body);
  } catch (error) {
    sendErrorResponse({ res, error });
  }

  let listQuery: any = {
    $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: true, $eq: undefined } }],
  };

  if (leavePrivilege?.list?.createdByOnly) {
    listQuery = {
      ...listQuery,
      ...{ userId: req.user._id },
    };
  }

  if (body.userId && !leavePrivilege?.list?.createdByOnly) {
    listQuery = {
      ...listQuery,
      ...{ userId: body.userId },
    };
  }

  const data = await getPaginatedData({ query: listQuery, model: leaveModel, paginationQuery: { currentPage: body.currentPage } });

  return res.json({ data });
}
