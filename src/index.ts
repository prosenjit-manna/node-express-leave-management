import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { get_env } from './lib/get-env';

import authRoutes from './view/auth';
import { dbConnect } from './lib/connection';
import { sentryInit } from './lib/sentry-error-tracking';
import employeeRouter from './view/employee';

dbConnect();

const app = express();
sentryInit({ app });

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/employee', employeeRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('API server up and running!');
});

app.listen(get_env.PORT, () => {
  console.log(`API Server running at http://localhost:${get_env.PORT}`);
});
