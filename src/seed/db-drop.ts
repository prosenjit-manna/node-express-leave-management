import dotenv from 'dotenv';
dotenv.config();
import { dbConnect } from '../lib/connection';

async function main() {
  const mongoose = await dbConnect();
  await mongoose?.connection.dropDatabase();
  mongoose?.disconnect();
  console.log('Successfully drop');
}

main();
