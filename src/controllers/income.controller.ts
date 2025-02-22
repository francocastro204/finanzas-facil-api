import { Response } from 'express';
import { IncomeService } from '../services/income.service';
import { IncomeInput, AuthRequest } from '../types';

export class IncomeController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const systemId = req.params.systemId;
      const input: IncomeInput = req.body;
      
      const income = await IncomeService.create(systemId, input);
      res.json(income);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el ingreso' });
    }
  }

  static async getBySystem(req: AuthRequest, res: Response) {
    try {
      const systemId = req.params.systemId;
      const incomes = await IncomeService.getBySystem(systemId);
      res.json(incomes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los ingresos' });
    }
  }

  static async getMonthlyTotal(req: AuthRequest, res: Response) {
    try {
      const systemId = req.params.systemId;
      const { month, year } = req.query;
      
      const total = await IncomeService.getMonthlyTotal(
        systemId,
        parseInt(month as string),
        parseInt(year as string)
      );
      
      res.json({ total });
    } catch (error) {
      res.status(500).json({ error: 'Error al calcular el total mensual' });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      await IncomeService.delete(id);
      res.json({ message: 'Ingreso eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el ingreso' });
    }
  }
} 