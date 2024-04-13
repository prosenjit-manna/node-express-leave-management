import { Request, Response } from 'express';
import { employeeModel } from '../../models/employeeModel';
import { ListEmployeeRequest, listEmployeeRequestSchema } from '../../interface/api/employee/list-employee/list-employee-request.schema';
import { sendErrorResponse } from '../../lib/sendResponse';
import { getPaginatedData } from '../../lib/getPaginatatedData';

export async function listEmployeeController(req: Request, res: Response) {
  const body: ListEmployeeRequest = req.body;

  try {
    listEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  let listQuery: any = {
    $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: true, $eq: undefined } }],
  };

  if (body.name) {
    listQuery = {
      ...listQuery,
      ...{ name: { $regex: new RegExp(body.name, 'i') } },
    };
  }

  const data = await getPaginatedData({ query: listQuery, model: employeeModel, paginationQuery: { currentPage: body.currentPage } });

  return res.json({ data });
}
