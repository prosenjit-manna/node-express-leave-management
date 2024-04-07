import { Privileges } from '../apiModel/privilege.interface';
import { Role } from '../apiModel/roles.enum';
import { appLoggerLevel, appLogger } from '../lib/logger';
import { roleModel } from '../models/rolesModel';

async function addRole({ privileges, role }: { privileges: Privileges; role: Role }) {
  try {
    const roleDoc = await roleModel.findOne({ name: role });

    if (!roleDoc) {
      const owner = new roleModel(privileges);
      await owner.save();
    } else {
      await roleDoc.updateOne(privileges);
    }
  } catch (e) {
    appLogger.log(appLoggerLevel.error, 'addRole error', e);
  }
}

// Adding Roles
export async function addRoles() {
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
    role: {
      update: true,
    },
    name: Role.APP_OWNER,
    type: Role.APP_OWNER,
  };

  await addRole({ privileges: ownerRoleData, role: Role.APP_OWNER });

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
    role: {
      update: true,
    },
    name: Role.ORG_OWNER,
    type: Role.ORG_OWNER,
  };
  await addRole({ privileges: orgRoleData, role: Role.ORG_OWNER });

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
  await addRole({ privileges: employeeRoleData, role: Role.USER });

  appLogger.log(appLoggerLevel.info, 'Roles Added');
}
