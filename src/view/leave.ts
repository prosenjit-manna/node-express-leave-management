import express from 'express';
import { authMiddleWare } from '../middlewares/authMiddleWare';
import { addLeaveController } from '../controller/leave/addLeaveController';
import { viewLeaveController } from '../controller/leave/viewLeaveController';
import { listEmployeeController } from '../controller/employee/listEmployeeController';
import { deleteEmployeeController } from '../controller/employee/deleteEmployeeController';

const leaveRoute = express.Router();

leaveRoute.post('/add', authMiddleWare, addLeaveController);
leaveRoute.post('/view', authMiddleWare, viewLeaveController);
leaveRoute.post('/list', authMiddleWare, listEmployeeController);
leaveRoute.delete('/delete', authMiddleWare, deleteEmployeeController);

export default leaveRoute;
