import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestHandler } from 'express';

const router = Router();

router.use(authMiddleware as unknown as RequestHandler);
router.post('/', AccountController.createAccount as unknown as RequestHandler);
router.get('/', AccountController.getAccounts as unknown as RequestHandler);

export default router; 