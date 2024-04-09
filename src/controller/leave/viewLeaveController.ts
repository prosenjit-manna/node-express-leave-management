import { Request, Response } from 'express';
import { ViewLeaveRequest, viewLeaveRequestSchema } from '../../interface/api/leave/view/viewLeaveRequest.schema';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { leaveModel } from '../../models/leaveModel';

export async function viewLeaveController(req: Request, res: Response) {
  const body = req.body as ViewLeaveRequest;

  try {
    viewLeaveRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  const leave = await leaveModel.findOne({ userId: body.leaveId });

  if (leave) {
    return sendSuccessResponse({ res, message: 'found leave', data: leave });
  } else {
    return sendErrorResponse({ res, message: 'Not Found Leave' });
  }
}
