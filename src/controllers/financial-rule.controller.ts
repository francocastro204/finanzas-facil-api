import { Response } from 'express';
import { FinancialRuleService } from '../services/financial-rule.service';
import { FinancialRuleInput, AuthRequest } from '../types';

export class FinancialRuleController {
  static async update(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id;
      const input: FinancialRuleInput = req.body;
      const systemId = req.params.systemId;

      await FinancialRuleService.validateRules(systemId, input.percentage, id);
      const rule = await FinancialRuleService.update(id, input);
      
      res.json(rule);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error al actualizar la regla financiera' });
      }
    }
  }

  static async getBySystem(req: AuthRequest, res: Response) {
    try {
      const systemId = req.params.systemId;
      const rules = await FinancialRuleService.getBySystem(systemId);
      res.json(rules);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las reglas financieras' });
    }
  }
} 