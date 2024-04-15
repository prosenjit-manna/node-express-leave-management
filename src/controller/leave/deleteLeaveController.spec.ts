import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { DeleteLeaveRequest } from '../../interface/api/leave/delete/deleteLeaveRequest.schema';
import { leaveModel } from '../../models/leaveModel';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`Delete Leave ${userType}`, () => {
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

    test('Delete Leave', async () => {
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

      const payload: DeleteLeaveRequest = {
        leaveId: String(leave?.id),
      };

      try {
        await testClient?.post('/leave/delete', payload);
      } catch (e: any) {
        expect(e).toBeUndefined();
      }
    });

    if (userType === UserType.USER) {
      test('Add Leave Not allowed for Other user', async () => {
        const currentUser: any = await testClient?.get('/auth/current-user');

        const leave = await leaveModel.findOne({
          deletedAt: { $in: [null, undefined] }, // Matches documents where 'deletedAt' is either null or undefined
          userId: { $nin: [new mongoose.Types.ObjectId(currentUser?.user?._id)] },
        });

        const payload: DeleteLeaveRequest = {
          leaveId: String(leave?.id),
        };

        try {
          await testClient?.post('/leave/delete', payload);
        } catch (e: any) {
          expect(e.message).toBe('Access Forbidden!');
        }
      });
    }
  });
});
