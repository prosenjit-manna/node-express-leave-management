import dotenv from 'dotenv';
dotenv.config();
import { appLoggerLevel, appLogger } from '../lib/logger';
import { dbConnect } from '../lib/connection';
import { addRoles } from './add-roles';
import { addUsers } from './add-users';
import { addEmployees } from './add-employee';
import { addLeaves } from './add-leave';

async function main() {
  appLogger.log(appLoggerLevel.info, 'Seed Started 🌱🌱');

  const connection = await dbConnect();

  await addRoles();

  await addUsers();

  await addEmployees();

  await addLeaves();
  await connection?.disconnect();

  appLogger.log(appLoggerLevel.info, 'Seed Completed ✅ ✅');
}

main();
