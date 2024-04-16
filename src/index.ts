import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { get_env } from './lib/get-env';

import authRoutes from './routes/auth';
import { dbConnect } from './lib/connection';
import { sentryInit } from './lib/sentry-error-tracking';
import employeeRouter from './routes/employee';
import leaveRoute from './routes/leave';
import { employeeMiddleWare } from './middlewares/employeeMiddleWare';
import { authMiddleWare } from './middlewares/authMiddleWare';
import { leaveMiddleWare } from './middlewares/leaveMiddleWare';
import leaveSettingsRoute from './routes/leave-settings';

dbConnect();

const app = express();
sentryInit({ app });

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/employee', authMiddleWare, employeeMiddleWare, employeeRouter);
app.use('/leave', authMiddleWare, leaveMiddleWare, leaveRoute);
app.use('/leave-settings', authMiddleWare, leaveMiddleWare, leaveSettingsRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('API server up and running!');
});

app.listen(get_env.PORT, () => {
  console.log(`API Server running at http://localhost:${get_env.PORT}`);
});
