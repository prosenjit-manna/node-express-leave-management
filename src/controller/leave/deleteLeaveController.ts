import { Request, Response } from 'express';
import { DeleteLeaveRequest, deleteLeaveRequestSchema } from '../../interface/api/leave/delete/deleteLeaveRequest.schema';
import { leaveModel } from '../../models/leaveModel';
import { sendErrorResponse, sendSuccessResponse } from '../../lib/sendResponse';

export async function deleteLeaveController(req: Request, res: Response) {
  const body: DeleteLeaveRequest = req.body;

  try {
    deleteLeaveRequestSchema.parse(req.body);
  } catch (error) {
    sendErrorResponse({ res, error });
  }

  try {
    const leave = await leaveModel.findOne({ _id: body.leaveId });

    if (!leave) {
      return sendErrorResponse({ res, message: 'Leave Not found!' });
    } else {
      await leave.updateOne({ deletedAt: new Date() });
      return sendSuccessResponse({ res, data: leave, message: 'Leave Deleted' });
    }
  } catch (error) {
    sendErrorResponse({ res, error });
  }
}
