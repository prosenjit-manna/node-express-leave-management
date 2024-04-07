import express from 'express';
import { authMiddleWare } from '../middlewares/authMiddleWare';
import { addEmployeeController } from '../controller/employee/addEmployeeController';

const employeeRouter = express.Router();

employeeRouter.post('/add', authMiddleWare, addEmployeeController);

export default employeeRouter;
