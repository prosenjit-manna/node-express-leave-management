import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { ListEmployeeRequest } from '../../interface/api/employee/list-employee/list-employee-request.schema';
import { employeeModel } from '../../models/employeeModel';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`List Employee ${userType}`, () => {
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

    test('List Employee', async () => {
      try {
        await testClient?.post('/employee/list');
      } catch (e: any) {
        if (userType === UserType.USER) {
          expect(e.message).toBe('Access Forbidden!');
        } else {
          expect(e).toBeUndefined();
        }
      }
    });

    test('Search Employee', async () => {
      const employee = await employeeModel.findOne({
        name: { $regex: /a|b|c|d/i }, // Regular expression to match names containing 'a', 'b', 'c', or 'd' (case-insensitive)
        deletedAt: { $in: [null, undefined] }, // Matches documents where 'deletedAt' is either null or undefined
      });

      const listEmployee: ListEmployeeRequest = {
        name: employee?.name.toLowerCase().split(' ')[0],
      };
      try {
        const list = await testClient?.post('/employee/list', listEmployee);
        expect(list?.data.list.length).toBeGreaterThan(0);
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
