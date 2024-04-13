import express from 'express';
import { addEmployeeController } from '../controller/employee/addEmployeeController';
import { viewEmployeeController } from '../controller/employee/viewEmployeeController';
import { listEmployeeController } from '../controller/employee/listEmployeeController';
import { deleteEmployeeController } from '../controller/employee/deleteEmployeeController';
import { editEmployeeController } from '../controller/employee/editEmployeeController';

const employeeRouter = express.Router();

employeeRouter.post('/add', addEmployeeController);
employeeRouter.post('/edit', editEmployeeController);
employeeRouter.post('/view', viewEmployeeController);
employeeRouter.post('/list', listEmployeeController);
employeeRouter.post('/delete', deleteEmployeeController);

export default employeeRouter;
