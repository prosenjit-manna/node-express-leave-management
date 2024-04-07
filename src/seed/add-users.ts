import { Role } from '../apiModel/roles.enum';
import { get_env } from '../lib/get-env';
import { appLoggerLevel, appLogger } from '../lib/logger';
import { roleModel } from '../models/rolesModel';
import { User, userModel } from '../models/userModel';
import bcrypt from 'bcrypt';

async function addUser({ username, role }: { username: string; role: Role }) {
  const user = await userModel.findOne({ username });
  const user_role = await roleModel.findOne({ name: role });
  const password = await bcrypt.hash(get_env.SEED_DEFAULT_PASSWORD, 10);
  const userData: User = { username: username, password, role, roleId: user_role?.id, emailVerified: true };
  if (user) {
    await user.updateOne(userData);
  } else {
    await userModel.create(userData);
  }
}

export async function addUsers() {
  try {
    const owner_email = get_env.OWNER_EMAIL;
    const email_part = get_env.OWNER_EMAIL.split('@');
    const org_email = `${email_part[0]}-org@${email_part[1]}`;
    const user_email = `${email_part[0]}-user@${email_part[1]}`;

    await addUser({ username: owner_email, role: Role.APP_OWNER });
    await addUser({ username: org_email, role: Role.ORG_OWNER });
    await addUser({ username: user_email, role: Role.USER });
  } catch (e) {
    appLogger.log(appLoggerLevel.error, 'Add User', e);
  }
}
