import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { Leave } from '../../interface/data/leave.interface';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`List Leave ${userType}`, () => {
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

    test('List Leave', async () => {
      try {
        const currentUser: any = await testClient?.get('/auth/current-user');

        const response = await testClient?.post('/leave/list');

        if (userType === UserType.USER) {
          const leave: Leave[] = response?.data.list;
          leave.map((l) => {
            expect(l.userId).toBe(currentUser.user._id);
          });
        }
      } catch (e: any) {
        expect(e).toBeUndefined();
      }
    });
  });
});
