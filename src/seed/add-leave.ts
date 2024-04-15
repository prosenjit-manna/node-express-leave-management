import { faker } from '@faker-js/faker';
import { startOfMonth, subMonths, eachDayOfInterval, isWeekend, format } from 'date-fns';
import { leaveModel } from '../models/leaveModel';
import { Leave } from '../interface/data/leave.interface';
import { employeeModel } from '../models/employeeModel';
import { LeaveType } from '../interface/data/leaveType.enum';
import { appLogger, appLoggerLevel } from '../lib/logger';

export async function addLeaves() {
  appLogger.log(appLoggerLevel.info, 'Leave Seed Started 🌱🌱');

  // Get the start and end dates for the last three months
  const endDate = new Date();
  const startDate = subMonths(startOfMonth(endDate), 2);

  // Generate an array of dates within the last three months
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  // Filter out the weekend days
  const weekdays = dates.filter((date) => !isWeekend(date));

  // Format the weekdays if needed
  const formattedWeekdays = weekdays.map((date) => format(date, 'yyyy-MM-dd'));

  // loop
  // eslint-disable-next-line no-unused-vars
  for (const day of formattedWeekdays) {
    const randomDay = faker.helpers.arrayElement(formattedWeekdays);
    const listQuery: any = {
      $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: true, $eq: undefined } }],
    };
    const users = (await employeeModel.find(listQuery)).map((e) => e.userId);
    const userId = faker.helpers.arrayElement(users);

    const payload: Leave = {
      userId: userId,
      leaveStart: new Date(randomDay),
      leaveEnd: new Date(randomDay),
      count: 1,
      leaveType: faker.helpers.arrayElement([LeaveType.CL, LeaveType.EL, LeaveType.SL]),
    };

    await leaveModel.create(payload);
  }
  appLogger.log(appLoggerLevel.info, 'Leave Seed Completed ✅ ✅');
}
