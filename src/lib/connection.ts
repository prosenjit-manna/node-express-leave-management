import mongoose from 'mongoose';
import { get_env } from './get-env';

export async function dbConnect() {
  try {
    return await mongoose.connect(get_env.MONGO_DB_URI, { dbName: get_env.MONGO_DB_NAME });
  } catch (e: any) {
    console.log(e.message);
  }
}
