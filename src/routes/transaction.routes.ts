import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestHandler } from 'express';

const router = Router();

router.use(authMiddleware as unknown as RequestHandler);

router.post('/', TransactionController.create as unknown as RequestHandler);
router.get('/', TransactionController.getTransactions as unknown as RequestHandler);

export default router;