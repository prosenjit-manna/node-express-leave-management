import express from 'express';
import { authMiddleWare } from '../middlewares/authMiddleWare';
import { addEmployeeController } from '../controller/employee/addEmployeeController';
import { viewEmployeeController } from '../controller/employee/viewEmployeeController';

const employeeRouter = express.Router();

employeeRouter.post('/add', authMiddleWare, addEmployeeController);
employeeRouter.post('/view', authMiddleWare, viewEmployeeController);

export default employeeRouter;
