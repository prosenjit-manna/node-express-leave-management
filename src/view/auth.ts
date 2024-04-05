import express, { Request, Response } from 'express';
import { LoginRequest } from '../apiModel/login/loginRequest.interface';
import { loginController } from '../controller/auth/login';
import { registerController } from '../controller/auth/register';
import { getPrivilegesController } from '../controller/auth/get-privileges';
import { verifyToken } from '../middlewares/authMiddleWare';
import { updateRoleController } from '../controller/auth/update-role-controller';
import { currentUserController } from '../controller/auth/currentUser.Controller';
const router = express.Router();

router.post('/register', async ({ body }: { body: LoginRequest }, res: Response) => {
  registerController({ body }, res);
});

// User login
router.post('/login', async (req: Request, res: Response) => {
  loginController(req, res);
});

router.get('/get-privileges', verifyToken, async (req: Request, res: Response) => {
  getPrivilegesController(req, res);
});

router.post('/update-role', verifyToken, async (req: Request, res: Response) => {
  updateRoleController(req, res);
});

router.get('/current-user', verifyToken, (req: Request, res: Response) => {
  currentUserController(req, res);
});

router.get('/', (req: Request, res: Response) => {
  res.send('Auth');
});

export default router;
