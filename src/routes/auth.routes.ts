import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { RequestHandler } from 'express';

const router = Router();

router.post('/register', AuthController.register as unknown as RequestHandler);
router.post('/login', AuthController.login as unknown as RequestHandler);

export default router; 