import express from 'express';
import { authMiddleWare } from '../middlewares/authMiddleWare';
import { addLeaveController } from '../controller/leave/addLeaveController';
import { viewLeaveController } from '../controller/leave/viewLeaveController';
import { listLeaveController } from '../controller/leave/listLeaveController';
import { editLeaveController } from '../controller/leave/editLeaveController';
import { deleteLeaveController } from '../controller/leave/deleteLeaveController';

const leaveRoute = express.Router();

leaveRoute.post('/add', authMiddleWare, addLeaveController);
leaveRoute.post('/edit', authMiddleWare, editLeaveController);
leaveRoute.post('/view', authMiddleWare, viewLeaveController);
leaveRoute.post('/list', authMiddleWare, listLeaveController);
leaveRoute.post('/delete', authMiddleWare, deleteLeaveController);

export default leaveRoute;
