import dotenv from 'dotenv';
dotenv.config();
import { LoggerLevel, logger } from '../lib/logger';
import { dbConnect } from '../lib/connection';
import { addRoles } from './add-roles';
import { addUsers } from './add-users';

async function main() {
  logger.log(LoggerLevel.info, 'Seed Started 🌱🌱');

  const connection = await dbConnect();

  await addRoles();

  await addUsers();

  await connection?.disconnect();

  logger.log(LoggerLevel.info, 'Seed Completed ✅ ✅');
}

main();
