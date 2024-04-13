import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { userModel } from '../../models/userModel';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { DeleteEmployeeRequest } from '../../interface/api/employee/delete-employee/delete-employee-request.schema';
import { employeeModel } from '../../models/employeeModel';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`Delete Employee ${userType}`, () => {
    let testClient: AxiosInstance | null;
    let mongoInstance: typeof mongoose | undefined;

    let testData = {
      userId: '',
      employeeId: '',
    };

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

    test('Delete Employee', async () => {
      const query = {
        $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: true, $eq: undefined } }],
      };
      const employee = await employeeModel.findOne(query).limit(1);
      console.log(employee);

      testData.userId = employee?.userId?.toString() as string;

      const payload: DeleteEmployeeRequest = {
        userId: testData.userId,
      };

      try {
        await testClient?.post('/employee/delete', payload);
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
