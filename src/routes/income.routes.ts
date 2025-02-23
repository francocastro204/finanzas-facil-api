import { Router } from 'express';
import { IncomeController } from '../controllers/income.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestHandler } from 'express';

const router = Router();

router.use(authMiddleware as unknown as RequestHandler);

// Rutas para ingresos de un sistema financiero
router.post('/system/:systemId', 
  IncomeController.create as unknown as RequestHandler
);
router.get('/system/:systemId', 
  IncomeController.getBySystem as unknown as RequestHandler
);
router.get('/system/:systemId/monthly', 
  IncomeController.getMonthlyTotal as unknown as RequestHandler
);
router.delete('/:id', 
  IncomeController.delete as unknown as RequestHandler
);

export default router; 