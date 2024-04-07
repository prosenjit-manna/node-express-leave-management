import express, { Request, Response } from 'express';
import { LoginRequest } from '../apiModel/login/loginRequest.interface';
import { loginController } from '../controller/auth/loginController';
import { registerController } from '../controller/auth/registerController';
import { verifyToken } from '../middlewares/authMiddleWare';
import { updateRoleController } from '../controller/auth/update-role-controller';
import { currentUserController } from '../controller/auth/currentUser.Controller';
import { forgetPasswordController } from '../controller/auth/forgetPasswordController';
import { resetPasswordController } from '../controller/auth/resetPasswordController';
const router = express.Router();

router.post('/register', async ({ body }: { body: LoginRequest }, res: Response) => {
  registerController({ body }, res);
});

// User login
router.post('/login', async (req: Request, res: Response) => {
  loginController(req, res);
});

router.post('/update-role', verifyToken, async (req: Request, res: Response) => {
  updateRoleController(req, res);
});

router.get('/current-user', verifyToken, (req: Request, res: Response) => {
  currentUserController(req, res);
});

router.post('/forget-password', (req: Request, res: Response) => {
  forgetPasswordController(req, res);
});

router.post('/reset-password', (req: Request, res: Response) => {
  resetPasswordController(req, res);
});

router.get('/', (req: Request, res: Response) => {
  res.send('Auth');
});

export default router;
