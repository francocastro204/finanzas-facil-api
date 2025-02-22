import { Response } from 'express';
import { FinancialSystemService } from '../services/financial-system.service';
import { FinancialSystemInput, AuthRequest } from '../types';
import { validateFinancialSystemLimit } from '../middlewares/plan.middleware';

export class FinancialSystemController {
  static async create(req: AuthRequest, res: Response) {
    try {
      await validateFinancialSystemLimit(req, res, async () => {
        const input: FinancialSystemInput = req.body;
        const profileId = req.params.profileId;

        const system = await FinancialSystemService.create(profileId, input);
        res.json(system);
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al crear el sistema financiero' });
      }
    }
  }

  static async getByProfile(req: AuthRequest, res: Response) {
    try {
      const profileId = req.params.profileId;
      const systems = await FinancialSystemService.getByProfile(profileId);
      res.json(systems);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los sistemas financieros' });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      const input: Partial<FinancialSystemInput> = req.body;
      const system = await FinancialSystemService.update(id, input);
      res.json(system);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el sistema financiero' });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      await FinancialSystemService.delete(id);
      res.json({ message: 'Sistema financiero eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el sistema financiero' });
    }
  }
} 