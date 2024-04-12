import express, { Request, Response } from 'express';
import { loginController } from '../controller/auth/loginController';
import { registerController } from '../controller/auth/registerController';
import { authMiddleWare } from '../middlewares/authMiddleWare';
import { updateRoleController } from '../controller/auth/update-role-controller';
import { currentUserController } from '../controller/auth/currentUser.Controller';
import { forgetPasswordController } from '../controller/auth/forgetPasswordController';
import { resetPasswordController } from '../controller/auth/resetPasswordController';
export const authRouter = express.Router();

authRouter.post('/register', registerController);

// User login
authRouter.post('/login', loginController);

authRouter.post('/update-role', authMiddleWare, updateRoleController);

authRouter.get('/current-user', authMiddleWare, currentUserController);

authRouter.post('/forget-password', forgetPasswordController);

authRouter.post('/reset-password', resetPasswordController);

authRouter.get('/', (req: Request, res: Response) => {
  res.send('Auth');
});

export default authRouter;
