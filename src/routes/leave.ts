import express from 'express';
import { addLeaveController } from '../controller/leave/addLeaveController';
import { viewLeaveController } from '../controller/leave/viewLeaveController';
import { listLeaveController } from '../controller/leave/listLeaveController';
import { editLeaveController } from '../controller/leave/editLeaveController';
import { deleteLeaveController } from '../controller/leave/deleteLeaveController';

const leaveRoute = express.Router();

leaveRoute.post('/add', addLeaveController);
leaveRoute.post('/edit', editLeaveController);
leaveRoute.post('/view', viewLeaveController);
leaveRoute.post('/list', listLeaveController);
leaveRoute.post('/delete', deleteLeaveController);

export default leaveRoute;
