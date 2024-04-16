import { Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { addLeaveSettingsRequestSchema } from '../../interface/api/leave-settings/add/leaveSettingsRequest.schema';
import { leaveSettingsModel } from '../../models/leaveSettingsModel';

export async function addLeaveSettingsController(req: Request, res: Response) {
  try {
    addLeaveSettingsRequestSchema.parse(req.body);
  } catch (error) {
    sendErrorResponse({ res, error });
  }
  try {
    const leave = await leaveSettingsModel.create({ ...req.body });
    return sendSuccessResponse({ res, data: leave, message: 'Leave settings added' });
  } catch (error) {
    sendErrorResponse({ res, error });
  }
}
