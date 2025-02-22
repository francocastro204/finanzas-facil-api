import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestHandler } from 'express';

const router = Router();

router.use(authMiddleware);
router.post('/', TransactionController.createTransaction as RequestHandler);
router.get('/', TransactionController.getTransactions as RequestHandler);

export default router;