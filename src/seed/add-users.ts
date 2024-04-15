import { range } from 'lodash';
import { User } from '../interface/data/user.interface';
import { UserType } from '../interface/data/userType.enum';
import { get_env } from '../lib/get-env';
import { appLoggerLevel, appLogger } from '../lib/logger';
import { roleModel } from '../models/rolesModel';
import { userModel } from '../models/userModel';
import bcrypt from 'bcrypt';

async function addUser({ username, role, userType }: { username: string; role: string; userType: UserType }) {
  const user = await userModel.findOne({ username });
  const user_role = await roleModel.findOne({ name: role });
  const password = await bcrypt.hash(get_env.SEED_DEFAULT_PASSWORD, 10);
  const userData: User = { username: username, password, role, roleId: user_role?.id, emailVerified: true, userType };
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

    await addUser({ username: owner_email, role: UserType.APP_OWNER, userType: UserType.APP_OWNER });
    await addUser({ username: org_email, role: UserType.ORG_OWNER, userType: UserType.ORG_OWNER });

    const list = range(0, 10);
    for (const userIndex of list) {
      const user_email = `${email_part[0]}-user-${userIndex}@${email_part[1]}`;
      const user = { username: user_email, role: UserType.USER, userType: UserType.USER };
      await addUser(user);
    }
  } catch (e) {
    appLogger.log(appLoggerLevel.error, 'Add User', e);
  }
}
