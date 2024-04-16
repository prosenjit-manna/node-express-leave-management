import { faker } from '@faker-js/faker';
import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { employeeModel } from '../../models/employeeModel';
import { AddLeaveRequest } from '../../interface/api/leave/add/addLeaveRequest.schema';
import { LeaveType } from '../../interface/data/leaveType.enum';
import { EditLeaveRequest } from '../../interface/api/leave/edit/ediLeaveRequest.schema';
import { leaveModel } from '../../models/leaveModel';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`Edit Leave ${userType}`, () => {
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

    test('Edit Leave', async () => {
      const currentUser: any = await testClient?.get('/auth/current-user');

      let leave = await leaveModel.findOne({
        deletedAt: { $in: [null, undefined] }, // Matches documents where 'deletedAt' is either null or undefined
        userId: { $nin: [new mongoose.Types.ObjectId(currentUser?.user?._id)] },
      });

      if (userType === UserType.USER) {
        leave = await leaveModel.findOne({
          userId: currentUser?.user?._id,
        });
      }

      const payload: EditLeaveRequest = {
        id: leave?.id,
        userId: String(leave?.userId),
        leaveStart: new Date().toISOString(),
        leaveEnd: new Date().toISOString(),
        count: 1,
        leaveType: faker.helpers.arrayElement([LeaveType.CL, LeaveType.EL, LeaveType.SL]),
      };

      try {
        await testClient?.post('/leave/edit', payload);
      } catch (e: any) {
        expect(e).toBeUndefined();
      }
    });

    if (userType === UserType.USER) {
      test('Edit Leave Not allowed for Other user', async () => {
        const currentUser: any = await testClient?.get('/auth/current-user');

        const leave = await leaveModel.findOne({
          userId: { $nin: [currentUser.user._id] },
        });

        const payload: EditLeaveRequest = {
          id: leave?.id,
          userId: String(leave?.userId),
          leaveStart: new Date().toISOString(),
          leaveEnd: new Date().toISOString(),
          count: 1,
          leaveType: faker.helpers.arrayElement([LeaveType.CL, LeaveType.EL, LeaveType.SL]),
        };
        try {
          await testClient?.post('/leave/edit', payload);
        } catch (e: any) {
          expect(e.message).toBe('Access Forbidden!');
        }
      });
    }
  });
});
