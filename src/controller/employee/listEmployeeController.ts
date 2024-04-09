import { Request, Response } from 'express';
import { employeeModel } from '../../models/employeeModel';
import { ListEmployeeRequest, listEmployeeRequestSchema } from '../../interface/api/employee/list-employee/list-employee-request.schema';
import { sendErrorResponse, sendForbiddenResponse } from '../../lib/sendResponse';
import { getPaginatedData } from '../../lib/getPaginatatedData';

export async function listEmployeeController(req: Request, res: Response) {
  const body: ListEmployeeRequest = req.body;

  if (!req.privileges.employee?.list) {
    return sendForbiddenResponse({ res });
  }

  try {
    listEmployeeRequestSchema.parse(body);
  } catch (error) {
    return sendErrorResponse({ error, res });
  }

  let listQuery = {};

  if (body.name) {
    listQuery = {
      ...listQuery,
      ...{ name: { $regex: new RegExp(body.name, 'i') } },
    };
  }

  const data = await getPaginatedData({ query: listQuery, model: employeeModel, paginationQuery: { currentPage: body.currentPage } });

  return res.json({ data });
}
