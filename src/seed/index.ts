import dotenv from 'dotenv';
dotenv.config();
import { LoggerLevel, logger } from '../lib/logger';
import { roleModel } from '../models/rolesModel';
import { dbConnect } from '../lib/connection';
import { Privileges } from '../apiModel/privilege.interface';
import { Role } from '../apiModel/roles.enum';

// Adding Roles
async function addRoles() {
  const ownerRole = await roleModel.findOne({ name: Role.APP_OWNER });
  const ownerRoleData: Privileges = {
    leave: {
      create: true,
      list: true,
      delete: true,
      update: true,
    },
    employee: {
      create: true,
      list: true,
      delete: true,
      update: true,
    },
    name: Role.APP_OWNER,
    type: Role.APP_OWNER,
  };
  if (!ownerRole) {
    const owner = new roleModel(ownerRoleData);
    await owner.save();
  } else {
    await ownerRole.updateOne(ownerRoleData);
  }

  const orgRole = await roleModel.findOne({ name: Role.ORG_OWNER });
  const orgRoleData: Privileges = {
    leave: {
      create: true,
      list: true,
      delete: true,
      update: true,
    },
    employee: {
      create: true,
      list: true,
      delete: true,
      update: true,
    },
    name: Role.ORG_OWNER,
    type: Role.ORG_OWNER,
  };

  if (!orgRole) {
    const hr = new roleModel(orgRoleData);
    await hr.save();
  } else {
    await orgRole.updateOne(orgRoleData);
  }

  const employeeRole = await roleModel.findOne({ name: Role.USER });
  const employeeRoleData: Privileges = {
    leave: {
      create: true,
      list: true,
      delete: true,
      update: true,
      documentOwner: true,
    },
    employee: {
      create: true,
      list: true,
      delete: true,
      update: true,
      documentOwner: true,
    },
    type: Role.USER,
    name: Role.USER,
  };
  if (!employeeRole) {
    const employee = new roleModel(employeeRoleData);
    await employee.save();
  } else {
    await employeeRole.updateOne(employeeRoleData);
  }

  logger.log(LoggerLevel.info, 'Roles Added');
}

async function main() {
  logger.log(LoggerLevel.info, 'Seed Started 🌱🌱');

  const connection = await dbConnect();

  await addRoles();

  await connection?.disconnect();

  logger.log(LoggerLevel.info, 'Seed Completed ✅ ✅');
}

main();
