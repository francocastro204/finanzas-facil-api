import { PrismaClient } from '@prisma/client';
import { IncomeInput } from '../types';

const prisma = new PrismaClient();

export class IncomeService {
  static async create(systemId: string, input: IncomeInput) {
    return prisma.income.create({
      data: {
        ...input,
        systemId
      }
    });
  }

  static async getBySystem(systemId: string) {
    return prisma.income.findMany({
      where: { systemId },
      orderBy: {
        date: 'desc'
      }
    });
  }

  static async getMonthlyTotal(systemId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const incomes = await prisma.income.findMany({
      where: {
        systemId,
        date: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    return incomes.reduce((total: number, income) => total + income.amount, 0);
  }

  static async delete(id: string) {
    return prisma.income.delete({
      where: { id }
    });
  }
} 