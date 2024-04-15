import { faker } from '@faker-js/faker';
import { EmployeeRequest } from '../../interface/api/employee/add-employee/add-employee-request.schema';
import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { userModel } from '../../models/userModel';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { employeeModel } from '../../models/employeeModel';
import { AddLeaveRequest, addLeaveRequestSchema } from '../../interface/api/leave/add/addLeaveRequest.schema';
import { LeaveType } from '../../interface/data/leaveType.enum';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`Add Leave ${userType}`, () => {
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

    test('Add Leave', async () => {
      const currentUser: any = await testClient?.get('/auth/current-user');

      let employee = await employeeModel.findOne({
        name: { $regex: /a|b|c|d/i }, // Regular expression to match names containing 'a', 'b', 'c', or 'd' (case-insensitive)
        deletedAt: { $in: [null, undefined] }, // Matches documents where 'deletedAt' is either null or undefined
        userId: { $nin: [new mongoose.Types.ObjectId(currentUser?.user?._id)] },
      });

      if (userType === UserType.USER) {
        employee = await employeeModel.findOne({
          userId: currentUser?.user?._id,
        });
      }

      const payload: AddLeaveRequest = {
        userId: String(employee?.userId),
        leaveStart: new Date().toISOString(),
        leaveEnd: new Date().toISOString(),
        count: 1,
        leaveType: faker.helpers.arrayElement([LeaveType.CL, LeaveType.EL, LeaveType.SL]),
      };

      try {
        await testClient?.post('/leave/add', payload);
      } catch (e: any) {
        expect(e).toBeUndefined();
      }
    });

    if (userType === UserType.USER) {
      test('Add Leave Not allowed for Other user', async () => {
        const currentUser: any = await testClient?.get('/auth/current-user');

        const employee = await employeeModel.findOne({
          userId: { $nin: [currentUser.user._id] },
        });

        const payload: AddLeaveRequest = {
          userId: String(employee?.userId),
          leaveStart: new Date().toISOString(),
          leaveEnd: new Date().toISOString(),
          count: 1,
          leaveType: faker.helpers.arrayElement([LeaveType.CL, LeaveType.EL, LeaveType.SL]),
        };

        try {
          await testClient?.post('/leave/add', payload);
        } catch (e: any) {
          expect(e).toBe('Access Forbidden!');
        }
      });
    }
  });
});
