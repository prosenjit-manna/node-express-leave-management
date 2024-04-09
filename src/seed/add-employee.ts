import { User } from '../interface/data/user.interface';
import { UserType } from '../interface/data/userType.enum';
import { employeeModel } from '../models/employeeModel';
import { userModel } from '../models/userModel';
import { Document } from 'mongoose';
import { faker } from '@faker-js/faker';

async function addEmployee(
  user: Document<unknown, {}, User> &
    User &
    Required<{
      _id: string;
    }>,
) {
  const employee = await employeeModel.findOne({ userId: user.id });
  if (!employee) {
    await employeeModel.create({
      userId: user.id,
      name: faker.internet.displayName(),
      phone: faker.phone.number(),
      gender: faker.helpers.arrayElement(['M', 'F']),
      dob: faker.date.anytime(),
    });
  }
}

export async function addEmployees() {
  const users = await userModel.find({ userType: UserType.USER });

  for (const user of users) {
    await addEmployee(user);
  }
}
