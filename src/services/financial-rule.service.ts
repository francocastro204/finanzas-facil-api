import { PrismaClient, FinancialRule } from '@prisma/client';
import { FinancialRuleInput } from '../types';

const prisma = new PrismaClient();

export class FinancialRuleService {
  static async update(id: string, input: FinancialRuleInput) {
    return prisma.financialRule.update({
      where: { id },
      data: input
    });
  }

  static async validateRules(systemId: string, newPercentage: number, excludeRuleId?: string) {
    const rules = await prisma.financialRule.findMany({
      where: {
        systemId,
        NOT: excludeRuleId ? { id: excludeRuleId } : undefined
      }
    });

    const totalPercentage = rules.reduce(
      (sum: number, rule: FinancialRule) => sum + rule.percentage, 
      0
    );
    
    if (totalPercentage + newPercentage > 100) {
      throw new Error('La suma de los porcentajes no puede superar el 100%');
    }
  }

  static async getBySystem(systemId: string) {
    return prisma.financialRule.findMany({
      where: { systemId },
      include: {
        expenses: true
      }
    });
  }
}