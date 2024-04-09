import { Request, Response } from 'express';
import { leaveModel } from '../../models/leaveModel';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { addLeaveRequestSchema } from '../../interface/api/leave/add/addLeaveRequest.schema';

export async function addLeaveController(req: Request, res: Response) {
  try {
    addLeaveRequestSchema.parse(req.body);
  } catch (error) {
    sendErrorResponse({ res, error });
  }
  try {
    const leave = await leaveModel.create({ ...req.body });
    return sendSuccessResponse({ res, data: leave, message: 'Leave Added' });
  } catch (error) {
    sendErrorResponse({ res, error });
  }
}
