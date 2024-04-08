import { Privileges } from '../interface/data/privilege.interface';
import { UserType } from '../interface/data/userType.enum';
import { appLoggerLevel, appLogger } from '../lib/logger';
import { roleModel } from '../models/rolesModel';

async function addRole({ privileges }: { privileges: Privileges }) {
  try {
    const roleDoc = await roleModel.findOne({ name: privileges.name });

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
    name: UserType.APP_OWNER,
  };

  await addRole({ privileges: ownerRoleData });

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
    name: UserType.ORG_OWNER,
  };
  await addRole({ privileges: orgRoleData });

  const employeeRoleData: Privileges = {
    leave: {
      create: true,
      list: true,
      delete: true,
      update: true,
      documentOwner: true,
    },
    employee: {
      documentOwner: true,
    },
    name: UserType.USER,
  };
  await addRole({ privileges: employeeRoleData });

  appLogger.log(appLoggerLevel.info, 'Roles Added');
}
