import { faker } from '@faker-js/faker';
import { EmployeeRequest } from '../../interface/api/employee/add-employee/add-employee-request.schema';
import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { userModel } from '../../models/userModel';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { employeeModel } from '../../models/employeeModel';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`Add Employee ${userType}`, () => {
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

    test('Add Employee', async () => {
      const user = await userModel.findOne({ userType: UserType.USER }).limit(1);
      testData.userId = user?._id as string;

      await employeeModel.deleteOne({ userId: testData.userId });

      const payload: EmployeeRequest = {
        userId: testData.userId,
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        gender: faker.helpers.arrayElement(['M', 'F']),
        dob: new Date().toISOString(),
      };

      try {
        await testClient?.post('/employee/add', payload);
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
