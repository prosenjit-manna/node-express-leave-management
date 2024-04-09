import express from 'express';
import { authMiddleWare } from '../middlewares/authMiddleWare';
import { addEmployeeController } from '../controller/employee/addEmployeeController';
import { viewEmployeeController } from '../controller/employee/viewEmployeeController';
import { listEmployeeController } from '../controller/employee/listEmployeeController';
import { deleteEmployeeController } from '../controller/employee/deleteEmployeeController';

const employeeRouter = express.Router();

employeeRouter.post('/add', authMiddleWare, addEmployeeController);
employeeRouter.post('/view', authMiddleWare, viewEmployeeController);
employeeRouter.post('/list', authMiddleWare, listEmployeeController);
employeeRouter.delete('/delete', authMiddleWare, deleteEmployeeController);

export default employeeRouter;