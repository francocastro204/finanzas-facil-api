import { Router } from 'express';
import { CollaboratorController } from '../controllers/collaborator.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestHandler } from 'express';

const router = Router();

router.use(authMiddleware as unknown as RequestHandler);

// Rutas para colaboradores de un sistema financiero
router.post('/system/:systemId', 
  CollaboratorController.create as unknown as RequestHandler
);
router.get('/system/:systemId', 
  CollaboratorController.getBySystem as unknown as RequestHandler
);

// Rutas para un colaborador específico
router.put('/:id', 
  CollaboratorController.update as unknown as RequestHandler
);
router.delete('/:id', 
  CollaboratorController.delete as unknown as RequestHandler
);

export default router; 