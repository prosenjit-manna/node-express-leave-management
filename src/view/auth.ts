import express, { Request, Response } from 'express';
import { LoginRequest } from '../apiModel/login/loginRequest.interface';
import { loginController } from '../controller/auth/login';
import { registerController } from '../controller/auth/register';
import { getPrivilegesController } from '../controller/auth/get-privileges';
import { verifyToken } from '../middlewares/authMiddleWare';
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

router.get('/', (req: Request, res: Response) => {
  res.send('Auth');
});

export default router;
