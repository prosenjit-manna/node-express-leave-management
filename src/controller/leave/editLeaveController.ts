import { Request, Response } from 'express';
import { EditLeaveRequest, editLeaveRequestSchema } from '../../interface/api/leave/edit/ediLeaveRequest.schema';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';
import { leaveModel } from '../../models/leaveModel';

export async function editLeaveController(req: Request, res: Response) {
  const body: EditLeaveRequest = req.body;

  try {
    editLeaveRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  try {
    const leave = await leaveModel.findById(body.id);
    if (!leave) {
      return sendErrorResponse({ message: 'Leave Not found', res });
    } else {
      await leave.updateOne(body);
      return sendSuccessResponse({ res, data: {}, message: 'Leave Updated!' });
    }
  } catch (error) {
    sendErrorResponse({ error, res });
  }
}
