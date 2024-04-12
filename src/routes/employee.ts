import express from 'express';
import { authMiddleWare } from '../middlewares/authMiddleWare';
import { addEmployeeController } from '../controller/employee/addEmployeeController';
import { viewEmployeeController } from '../controller/employee/viewEmployeeController';
import { listEmployeeController } from '../controller/employee/listEmployeeController';
import { deleteEmployeeController } from '../controller/employee/deleteEmployeeController';
import { editEmployeeController } from '../controller/employee/editEmployeeController';

const employeeRouter = express.Router();

employeeRouter.post('/add', authMiddleWare, addEmployeeController);
employeeRouter.post('/edit', authMiddleWare, editEmployeeController);
employeeRouter.post('/view', authMiddleWare, viewEmployeeController);
employeeRouter.post('/list', authMiddleWare, listEmployeeController);
employeeRouter.post('/delete', authMiddleWare, deleteEmployeeController);

export default employeeRouter;
