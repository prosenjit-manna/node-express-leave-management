import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { employeeModel } from '../../models/employeeModel';
import { viewEmployeeRequest } from '../../interface/api/employee/view-employee/view-employee-request.schema';
import { leaveModel } from '../../models/leaveModel';
import { ViewLeaveRequest } from '../../interface/api/leave/view/viewLeaveRequest.schema';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`View Leave ${userType}`, () => {
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

    test('View Leave', async () => {
      const currentUser: any = await testClient?.get('/auth/current-user');

      let query = {
        $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: true, $eq: undefined } }],
      };

      if (userType === UserType.USER) {
        query = {
          ...query,
          ...{ userId: currentUser.user._id },
        };
      }

      const leave = await leaveModel.findOne(query).limit(1);
      const payload: ViewLeaveRequest = {
        leaveId: leave?.id,
      };

      try {
        const response = await testClient?.post('/leave/view', payload);
      } catch (e: any) {
        expect(e.message).toBeUndefined();
      }
    });
  });
});
