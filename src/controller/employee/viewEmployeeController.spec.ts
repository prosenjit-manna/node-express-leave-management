import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { ListEmployeeRequest } from '../../interface/api/employee/list-employee/list-employee-request.schema';
import { employeeModel } from '../../models/employeeModel';
import { viewEmployeeRequest } from '../../interface/api/employee/view-employee/view-employee-request.schema';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`View Employee ${userType}`, () => {
    let testClient: AxiosInstance | null;
    let mongoInstance: typeof mongoose | undefined;

    beforeAll(async () => {
      mongoInstance = await dbConnect();
    });
    afterAll(() => {
      if (mongoInstance) {
        mongoInstance.disconnect();
      }
      testClient = null;
    });

    test('Login', async () => {
      testClient = await getAuthenticatedClient(userType);
    });

    test('View Employee', async () => {
      const query = {
        $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: true, $eq: undefined } }],
      };
      const employee = await employeeModel.findOne(query).limit(1);
      const payload: viewEmployeeRequest = {
        employeeId: employee?.id,
      };

      try {
        await testClient?.post('/employee/view', payload);
      } catch (e: any) {
        if (userType === UserType.USER) {
          expect(e.message).toBe('Access Forbidden!');
        } else {
          expect(e).toBeUndefined();
        }
      }
    });
  });
});
