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
  // Owner
  const ownerRoleData: Privileges = {
    leave: {
      create: { enabled: true, policy: 'User Has document create Permission' },
      list: { enabled: true, policy: 'User Has list Permission' },
      delete: { enabled: true, policy: 'User Has Delete Permission' },
      update: { enabled: true, policy: 'User Has Edit / Update Permission' },
    },
    employee: {
      create: { enabled: true, policy: 'User Has document create Permission' },
      list: { enabled: true, policy: 'User Has list Permission' },
      delete: { enabled: true, policy: 'User Has Delete Permission' },
      update: { enabled: true, policy: 'User Has Edit / Update Permission' },
    },
    role: {
      update: { enabled: true, policy: 'User Has Edit / Update Permission' },
    },
    name: UserType.APP_OWNER,
  };

  await addRole({ privileges: ownerRoleData });

  // ORG
  const orgRoleData: Privileges = {
    leave: {
      create: { enabled: true, policy: 'User Has document create Permission' },
      list: { enabled: true, policy: 'User Has list Permission' },
      delete: { enabled: true, policy: 'User Has Delete Permission' },
      update: { enabled: true, policy: 'User Has Edit / Update Permission' },
    },
    employee: {
      create: { enabled: true, policy: 'User Has document create Permission' },
      list: { enabled: true, policy: 'User Has list Permission' },
      delete: { enabled: true, policy: 'User Has Delete Permission' },
      update: { enabled: true, policy: 'User Has Edit / Update Permission' },
    },
    role: {
      list: { enabled: true, policy: 'User Has list Permission' },
      update: { enabled: true, policy: 'User Has Edit / Update Permission' },
    },
    name: UserType.ORG_OWNER,
  };
  await addRole({ privileges: orgRoleData });

  // User
  const employeeRoleData: Privileges = {
    leave: {
      create: { enabled: true, createdByOnly: true, policy: 'User Has document create Permission' },
      list: { enabled: true, createdByOnly: true, policy: 'User Has list Permission' },
      delete: { enabled: false, createdByOnly: true, policy: 'User can only delete own data' },
      update: { enabled: true, createdByOnly: true, policy: 'User Has Edit / Update Permission' },
    },
    employee: {
      list: { enabled: true, createdByOnly: true, policy: 'It is only impact for view routes' },
    },
    name: UserType.USER,
  };
  await addRole({ privileges: employeeRoleData });

  appLogger.log(appLoggerLevel.info, 'Roles Added');
}
