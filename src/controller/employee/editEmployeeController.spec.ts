import { getAuthenticatedClient } from '../../lib-e2e/getAuthenticatedClient';
import { AxiosInstance } from 'axios';
import { dbConnect } from '../../lib/connection';
import mongoose from 'mongoose';
import { UserType } from '../../interface/data/userType.enum';
import { DeleteEmployeeRequest } from '../../interface/api/employee/delete-employee/delete-employee-request.schema';
import { employeeModel } from '../../models/employeeModel';
import { EditEmployeeRequest } from '../../interface/api/employee/edit-employee/editRequest.schema';
import { faker } from '@faker-js/faker';

[UserType.APP_OWNER, UserType.ORG_OWNER, UserType.USER].forEach(async (userType) => {
  describe(`Edit Employee ${userType}`, () => {
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

    test('Edit Employee', async () => {
      const query = {
        $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: true, $eq: undefined } }],
      };
      const employee = await employeeModel.findOne(query).limit(1);

      const payload: EditEmployeeRequest = {
        id: employee?.id,
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        gender: 'M',
        dob: '2024-04-10',
      };

      try {
        await testClient?.post('/employee/edit', payload);
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
