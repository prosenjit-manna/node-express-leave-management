import express, { Request, Response } from 'express';
import { LoginRequest } from '../interface/api/auth/login/loginRequest.interface';
import { loginController } from '../controller/auth/loginController';
import { registerController } from '../controller/auth/registerController';
import { authMiddleWare } from '../middlewares/authMiddleWare';
import { updateRoleController } from '../controller/auth/update-role-controller';
import { currentUserController } from '../controller/auth/currentUser.Controller';
import { forgetPasswordController } from '../controller/auth/forgetPasswordController';
import { resetPasswordController } from '../controller/auth/resetPasswordController';
export const authRouter = express.Router();

authRouter.post('/register', async ({ body }: { body: LoginRequest }, res: Response) => {
  registerController({ body }, res);
});

// User login
authRouter.post('/login', async (req: Request, res: Response) => {
  loginController(req, res);
});

authRouter.post('/update-role', authMiddleWare, async (req: Request, res: Response) => {
  updateRoleController(req, res);
});

authRouter.get('/current-user', authMiddleWare, (req: Request, res: Response) => {
  currentUserController(req, res);
});

authRouter.post('/forget-password', (req: Request, res: Response) => {
  forgetPasswordController(req, res);
});

authRouter.post('/reset-password', (req: Request, res: Response) => {
  resetPasswordController(req, res);
});

authRouter.get('/', (req: Request, res: Response) => {
  res.send('Auth');
});

export default authRouter;
