import { faker } from "@faker-js/faker"
import { EmployeeRequest } from "../../interface/api/employee/add-employee/add-employee-request.schema"
import { getAuthenticatedClient } from "../../lib-e2e/getAuthenticatedClient"
import { get_env } from "../../lib/get-env"
import { AxiosInstance } from "axios"
import { userModel } from "../../models/userModel"
import { dbConnect } from "../../lib/connection"
import mongoose from "mongoose"
import { UserType } from "../../interface/data/userType.enum"
import { employeeModel } from "../../models/employeeModel"
import { EditEmployeeRequest } from "../../interface/api/employee/edit-employee/editRequest.schema"
import { viewEmployeeRequest } from "../../interface/api/employee/view-employee/view-employee-request.schema"
import { DeleteEmployeeRequest } from "../../interface/api/employee/delete-employee/delete-employee-request.schema"

describe('Add Employee', () => {
  let ownerClient: AxiosInstance;
  let mongoInstance: typeof mongoose | undefined;
  let userId: string;

  beforeAll(async () => {
    mongoInstance = await dbConnect();
  });
  afterAll(() => {
    if (mongoInstance) {
      mongoInstance.disconnect();
    }
  });

  test('Login', async () => {
    ownerClient = await getAuthenticatedClient(UserType.APP_OWNER);
  })

  test('Delete Employee', async () => {
    console.log(userId);
    const payload: DeleteEmployeeRequest = {
      userId,
    }
    await ownerClient.post('/employee/delete', payload);
  })


})